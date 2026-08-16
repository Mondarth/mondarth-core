/*
 * Linked Tokens — Mirror movement from one token to its paired token.
 *
 * Pairing is stored as a flag on each token document: "linkedTokens.partnerId".
 * Place this script in a module's init hook, or run it as a macro
 * (though a macro won't persist across sessions — a module is preferred).
 *
 * The script listens for position changes on any token that has a partner
 * configured, and applies the SAME positional delta to the partner token.
 *
 * V14+ API: Uses Document.update(), TokenDocument, and flag system.
 */

// ─── Configuration helpers ──────────────────────────────────────────

/**
 * Link two tokens bidirectionally by storing each other's ID as a flag.
 * @param {TokenDocument} tokenA
 * @param {TokenDocument} tokenB
 */
async function linkTokens(tokenA, tokenB) {
  // Store the partner reference using V14 flag system on the TokenDocument.
  // Flags are namespaced by module name — here we use a generic namespace.
  const namespace = 'world';
  const key = 'partnerId';

  // 3. Construct the update path
  // In V14+, we can use dot notation in the keys object for nested updates

  tokenA.setFlag(namespace, key, tokenB.id);
  tokenB.setFlag(namespace, key, tokenA.id);
  //await tokenA.document.update({ [`flags.${namespace}.${key}`]: tokenB });
  //await tokenB.document.update({ [`flags.${namespace}.${key}`]: tokenA });

  ui.notifications.info(`Linked "${tokenA.name}" ↔ "${tokenB.name}".`);
}

/**
 * Remove the pairing from one or both tokens.
 * @param {TokenDocument} token
 */
async function unlinkToken(token) {
  const partnerId = token.getFlag('world', 'partnerId');
  if (partnerId) {
    const partner = token.parent?.tokens?.get(partnerId) ?? game.scenes.current.tokens.get(partnerId);
    if (partner) await partner.unsetFlag('world', 'partnerId');
  }
  await token.unsetFlag('world', 'partnerId');
  ui.notifications.info(`Unlinked "${token.name}".`);
}

async function flipLevels(token) {
  const partnerId = token.getFlag('world', 'partnerId');
  if (!partnerId) return;

  const scene = token.parent; // The SceneDocument
  const partner = scene?.tokens?.get(partnerId);
  if (!partner) return;

  const level = token.level;
  const partnerLevel = partner.level;

  await token.update({ level: partnerLevel });
  await partner.update({ level: level });
}
// ─── Movement mirror logic ──────────────────────────────────────────

// Track in-flight updates to prevent infinite loops:
// When we update the partner token, THAT fires updateToken again,
// which would try to mirror back — creating an endless ping-pong.
const _activeMirrors = new Set();

Hooks.on('updateToken', async (tokenDoc, changes) => {
  // Only react to position changes (x or y in the changes diff).
  if (changes.x === undefined && changes.y === undefined) return;

  // Ignore our own mirrored updates.
  const pairKey = `${tokenDoc.id}`;
  if (_activeMirrors.has(pairKey)) return;

  // Find the linked partner via the flag.
  const partnerId = tokenDoc.getFlag('world', 'partnerId');
  if (!partnerId) return;

  const scene = tokenDoc.parent; // The SceneDocument
  const partner = scene?.tokens?.get(partnerId);
  if (!partner) return;

  // Build the update payload with the SAME coordinates.
  // We copy absolute positions — both tokens snap to the same spot.
  // If you want an OFFSET (e.g., partner stays 2 grid cells to the right),
  // store an offset flag and apply it here instead.
  const updateData = {};
  if (changes.x !== undefined) updateData.x = changes.x;
  if (changes.y !== undefined) updateData.y = changes.y;

  // Mark this partner as "being mirrored" to prevent recursive triggering.
  _activeMirrors.add(partner.id);

  try {
    // V14: TokenDocument.update() broadcasts to all clients.
    // Using { animation: false } avoids double-animation jank.
    await partner.update(updateData, { animation: false });
  } finally {
    // Clean up the guard flag after the update settles.
    _activeMirrors.delete(partner.id);
  }
});

export default {
  linkTokens,
  unlinkToken,
  flipLevels,
};
