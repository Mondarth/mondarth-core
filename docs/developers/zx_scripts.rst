.. _zx scripts:
``zx`` Scripts
==============

These scripts are utilities for use during development, build, and testing. They are not part of the final module.

The Scripts
-----------

These scripts defer to `PDT <https://github.com/ulenarofmondarth/pdt>`_\ [#F2]_ if it is installed. Otherwise they offer limited capabilities aimed at providing single module development and test environments.

foundryvtt
~~~~~~~~~~

Controls one or more local Foundry VTT instances.

:program:`foundryvtt start`
   Start the default Foundry VTT. If a previously stopped default instance exists this will restart it. If the instance is already running nothing is done.

:program:`foundryvtt stop`
   Stop the default Foundry VTT. If the instance is not running nothing is done.

:program:`foundryvtt reset`
   Reset (clear all data, so use with care) the default Foundry VTT. It the instance exists it is stopped (if running), the container is destroyed, and the data directory is destroyed.



Configuring Scripts
-------------------

The easiest way to set the environment variables for these scripts is with a `'.env`` file in the root of your project. All environment variables specific to these scripts are prefixed with ``ZXS_`` (for 'ZX Script').

You will find the defaults in ``.env``. These defaults will generally work well in a standalone module build environment\ [#F1]_. To override these it is recommended to create a ``.env.local`` specific to your development environment. You should not commit ``.env.local`` into :program:`git`.

The general form of configuration environment variables is: ``ZXS_<hierarchical namespace>`` where the namespaces are delineated by ``_``.

The configuration

  

.. code-block:: json

   {
     "docker": {
        "main-vtt": {
          "name": "foundry-vtt",
          "ports": {
            "vtt": {
               "container": 8000,
               "host": 8080
              }
            }
          }
        }

     }
   }

is represented with the environment vairables

.. code-block:: sh

   ZXS_DOCKER_MAIN-VTT_NAME = "foundry-vtt"
   ZXS_DOCKER_MAIN-VTT_PORTS_VTT_CONTAINER = 8000
   ZXS_DOCKER_MAIN-VTT_PORTS_VTT_HOST = 8080

.. note:: No attempt is made to represent an array in this schema. Instead an 'array' is represented as the values of an object, in the example neithes ``docker`` nor ``ports`` care about their keys, the script treats the values as a simple array.

.. rubric:: Footnote

.. [#F2] PDT offers a suite of tools to help with development and testing of Foundry modules.

.. [#F1] If you are incorporating this module into a monorepo then you will need to rework a lot of the scripts and workflows. This is *way* beyond the scope of this text. Dealing with the defaults in ``.env`` is going to be the least of your issues.

