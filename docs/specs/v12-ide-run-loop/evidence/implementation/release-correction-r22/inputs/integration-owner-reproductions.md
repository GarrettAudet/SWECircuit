# Revision 22 Integration-Owner Reproductions

Date: 2026-07-21

## R21 Provenance Failure

The approved Revision 21 package declares:

- test/v12-release-review.test.mjs
- 47,904 bytes
- sha256:5a6fd60a28d2d5ea9bb7ad3c8cbf5ee8212e2da6eafa91d2cba9f002215613ab

The declared checkpoint f4f91a373dd7f8028ec5d592e89c75f0027245c3 contains:

- 12,922 bytes
- sha256:1abb654e346f0a6f98aa2fbab69901e0a0f8a5eebef9c9fecfa98375fe38f6e3

A Git object scan found no 47,904-byte blob. V11 core verified the exact replacement handoff as complete with outcome block and phaseReady false.

## npm 11 Closed-Environment Failure

Environment:

- Node v24.14.1
- npm 11.11.0
- Windows

Using RELEASE_REVIEW_PARENT_TEST_HOOKS.closedEnvironment with the production parent produced:

~~~json
{
  "userconfig": "NUL",
  "globalconfig": "NUL",
  "status": 1,
  "stderr": "Exit prior to config file resolving\ncause\ndouble-loading config \"C:\\tmp\\swecircuit-identity-main\\NUL\" as \"global\", previously loaded as \"user\""
}
~~~

This fails before npm can inspect its version or install the exact offline supply.

## Adapter Policy Violation

Deleting only npm_config_globalconfig, as the Revision 21 fixture adapter does, makes npm pass but restores the host global configuration:

~~~json
{
  "status": 0,
  "version": "11.11.0",
  "globalconfigStatus": 0,
  "globalconfig": "C:\\Users\\garre\\AppData\\Roaming\\npm\\etc\\npmrc",
  "userconfig": "NUL",
  "globalconfigEnv": null
}
~~~

Classification: production closed-environment defect plus test masking. The correction must use two distinct private empty files and remove the adapter.
