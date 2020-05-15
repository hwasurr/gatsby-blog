import * as dotenv from 'dotenv';
import * as cdk from '@aws-cdk/core';
import * as amplify from '@aws-cdk/aws-amplify';

dotenv.config();

export default class HwasurrDotIoAwsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get environment variables from ssm
    const REPOSITORY_OWNER = 'hwasurr';
    const REPOSITORY_NAME = 'hwasurr.io';
    const DOMAIN_NAME = 'hwasurr.io';
    const devAccessId = 'dev';
    const devAccessPassword = 'dev';


    // Define Amplify console app
    const myAmplifyApp = new amplify.App(this, 'hwasurr-dot-io', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: REPOSITORY_OWNER,
        repository: REPOSITORY_NAME,
        oauthToken: cdk.SecretValue.plainText(process.env.GITHUB_ACCESS_TOKEN_HWASURR_DOT_IO!)
      })
    });

    // Add master branchs
    const myAmplifyAppMasterBranch = myAmplifyApp.addBranch('master');
    const myAmplifyAppDevBranch = myAmplifyApp.addBranch('dev', {
      basicAuth: amplify.BasicAuth.fromCredentials( // Restricting Access
        devAccessId,
        cdk.SecretValue.plainText(devAccessPassword)
      )
    });

    // Add domains
    const domain = myAmplifyApp.addDomain(DOMAIN_NAME);
    domain.mapRoot(myAmplifyAppMasterBranch);
    domain.mapSubDomain(myAmplifyAppDevBranch); // Sub domain prefix defaults to branch name
  }
}
