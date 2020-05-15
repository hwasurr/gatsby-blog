#!/usr/bin/env node
import 'source-map-support/register';
import * as dotenv from 'dotenv';
import * as cdk from '@aws-cdk/core';
import HwasurrDotIoAwsStack from '../lib/hwasurr-dot-io-aws-stack';

dotenv.config();

const app = new cdk.App();
((): HwasurrDotIoAwsStack => new HwasurrDotIoAwsStack(app, 'hwasurrDotIoAwsStack', {
  env: {
    region: process.env.AWS_REGION,
    account: cdk.Aws.ACCOUNT_ID
  }
}))();
