import * as dotenv from 'dotenv';
import * as cdk from '@aws-cdk/core';
import * as amplify from '@aws-cdk/aws-amplify';

dotenv.config();

export default class HwasurrDotIoAwsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define Amplify console app
    const myAmplifyApp = new amplify.App(this, 'hwasurr-dot-io', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'hwasurr',
        repository: 'hwasurr.io',
        oauthToken: cdk.SecretValue.plainText(process.env.GITHUB_ACCESS_TOKEN_HWASURR_DOT_IO!)
      })
    });

    // Add master branchs
    const myAmplifyAppMasterBranch = myAmplifyApp.addBranch('master');
    const myAmplifyAppDevBranch = myAmplifyApp.addBranch('dev');

    // Add domains
    const domain = myAmplifyApp.addDomain('hwasurr.io');
    domain.mapRoot(myAmplifyAppMasterBranch);
    domain.mapSubDomain(myAmplifyAppDevBranch); // Sub domain prefix defaults to branch name
  }
}
