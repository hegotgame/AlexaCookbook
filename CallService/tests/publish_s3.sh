#!/usr/bin/env bash

# install and configure the AWS CLI first.
# see documentation at https://aws.amazon.com/cli/
# see install walkthrough within
#   https://developer.amazon.com/public/community/post/Tx1UE9W1NQ0GYII/Publishing-Your-Skill-Code-to-Lambda-via-the-Command-Line-Interface


# automate this script to run every 5 minutes using Cron, the job scheduler
#
#      crontab
#      */5 * * * * /home/robert/SkillsDataAccess/tests/SetupSources/publish_s3.sh




aws s3 cp ./SetupSources/data/dataset.csv s3://alexabucket7/dataset.csv


