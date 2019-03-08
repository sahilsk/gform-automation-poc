# About

A sample project showing a version controlled google form, its deployment and triggers creation.

> NOTE: DUE TO LIMITATION WITH GOOGLE FORM APIS, THE TRIGGER CREATION PROCESS INCLUDE MANUAL INTERVENTION

[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

Setting up clasp
---

## Update clasp setting

Update `.clasp.json` settings file.


    clasp setting
    clasp setting projectId <project-id>

### How to get project id?

- Run `clasp open`
- Inside browser Click Resources -> Cloud Platform Project
- Copy project id. eg `project-id-xxx`



# Deployment Workflow
---

    clasp login
    clasp push
    clasp deploy

Execute your function (manual ):

    clasp open

Now, Select function -> Run (, and debug)


# Run

        clasp run <function name>

Remotely executes an Apps Script function.

To use this command you must:

- Log in with your credentials (`clasp login --creds creds.json`)
- Deploy the Script as an API executable (Easiest done via GUI at the moment).
- Enable any APIs that are used by the script.
- Have the following in your appsscript.json:

        "executionApi": {
            "access": "ANYONE"
        }

> Currently **triggers are unsupported**. So, if your function is using them, it'll not execute.
- Issue [detail](https://github.com/google/clasp/issues/522)
- Read more on [Limitations](https://developers.google.com/apps-script/api/how-tos/execute#limitations).

### Enable apis

This is required to use `clasp run` command.

    clasp apis enable script

Check enabled apis list

    clasp apis --open

### Obtain creds

    clasp open --creds

- In browser click Create Credentials -> Select OAuth client Id > Check Application type: other -> Enter name > click create
- Download credentials and rename it "creds.json"

### use your creds.json file 
    
Remove old session

    creds logout

Create new session:

    creds login --creds creds.json

Move generated `.clasprc.json` file to `~/.clasprc.json` as version `v2.0.1` read only from home directory.

    mv ./.clasprc.json  ~/.clasprc.json


Now, execute

     clasp push

Execute a function:

     clasp run 'HelloWorld'


# Logs


Prints out most recent the StackDriver logs. These are logs from `console.log`, not `Logger.log`.

### Options

- --json: Output logs in json format.
- --open: Open StackDriver logs in a browser.
- --setup: Setup StackDriver logs.
- --watch: Retrieves the newest logs every 5 seconds.

### Examples

    clasp logs
    ERROR Sat Apr 07 2019 10:58:31 GMT-0700 (PDT) myFunction      my log error
    INFO  Sat Apr 07 2019 10:58:31 GMT-0700 (PDT) myFunction      info message

- useful flags

        clasp logs --json
        clasp logs --open
        clasp logs --watch


Reference
---

- Troubleshooting setup : https://github.com/google/clasp/issues/506
