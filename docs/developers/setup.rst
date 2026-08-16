Setup
=====

Once the :ref:`prerequisites` are installed setup is simple enough.

.. code-block

   git clone -depth 1 https://github.com/Mondarth..... project-name
   cd project-name
   rm -rf .git
   git init
   pnpm install
   pnpm prepare

Edit ``module.json`` and set:

``id``
  A unique id for the module. Use ``-`` instead of a space (and no spaces), lowercase.
``title``
  A string short title for the module. This will appear in on the Foundry Add-Modules page.
``description``
  A description of what the module does. Keep it short. This also appears on the Add-Module screen.
``authors``
  Porvide at least one Author entry.
``compatibility``
  Set which versions of Foundry this module is compatible.

You may also need to set various other values in ``module.json`` (e.g. ``socket`` if your module uses ``socketlib``), but these will vary widely according to what your module does.

If you use :program:`github` for your versioning and distribution then you can leave the following entries alone and the ``.github/workflows`` will maintain them for you. (Otherwise, see :ref:`replacing github`.)

* ``url``
* ``readme``
* ``bugs``
* ``changelog``
* ``manifest``
* ``download``


Edit ``docs/conf.py`` and change:

``project``
  This will be the documentation's main title (and home page).
``copyright``
  holder of the copyright to the documenation.
``author``
  Who wrote the documentation.

If using the provided :program:`github` setup the ``release`` will be maintained by the documentation build workflow.

And you should be good to go.

