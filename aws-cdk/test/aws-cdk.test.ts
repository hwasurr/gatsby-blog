import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import AwsCdk from '../lib/hwasurr-dot-io-aws-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsCdk(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(matchTemplate({
    Resources: {
      HwasurrDotIoAmplifyRole2CCC8979: {
        Type: 'AWS::IAM::Role',
        Properties: {
          AssumeRolePolicyDocument: {
            Statement: [
              {
                Action: 'sts:AssumeRole',
                Effect: 'Allow',
                Principal: {
                  Service: 'amplify.amazonaws.com'
                }
              }
            ],
            Version: '2012-10-17'
          }
        }
      },
      HwasurrDotIoAmplifyF91F86B8: {
        Type: 'AWS::Amplify::App',
        Properties: {
          Name: 'HwasurrDotIoAmplify',
          IAMServiceRole: {
            'Fn::GetAtt': [
              'HwasurrDotIoAmplifyRole2CCC8979',
              'Arn'
            ]
          },
          OauthToken: '{{resolve:ssm-secure:AMPLIFY_GITHUB_TOKEN:1}}',
          Repository: 'https://github.com/hwasurr/hwasurr-dot-io'
        }
      },
      HwasurrDotIoAmplifymasterDB693F80: {
        Type: 'AWS::Amplify::Branch',
        Properties: {
          AppId: {
            'Fn::GetAtt': [
              'HwasurrDotIoAmplifyF91F86B8',
              'AppId'
            ]
          },
          BranchName: 'master',
          EnableAutoBuild: true,
          EnablePullRequestPreview: true
        }
      },
      HwasurrDotIoAmplifydev7AC082A7: {
        Type: 'AWS::Amplify::Branch',
        Properties: {
          AppId: {
            'Fn::GetAtt': [
              'HwasurrDotIoAmplifyF91F86B8',
              'AppId'
            ]
          },
          BranchName: 'dev',
          EnableAutoBuild: true,
          EnablePullRequestPreview: true
        }
      },
      HwasurrDotIoAmplifyhwasurrio3E5EA706: {
        Type: 'AWS::Amplify::Domain',
        Properties: {
          AppId: {
            'Fn::GetAtt': [
              'HwasurrDotIoAmplifyF91F86B8',
              'AppId'
            ]
          },
          DomainName: 'hwasurr.io',
          SubDomainSettings: [
            {
              BranchName: {
                'Fn::GetAtt': [
                  'HwasurrDotIoAmplifymasterDB693F80',
                  'BranchName'
                ]
              },
              Prefix: ''
            },
            {
              BranchName: {
                'Fn::GetAtt': [
                  'HwasurrDotIoAmplifydev7AC082A7',
                  'BranchName'
                ]
              },
              Prefix: {
                'Fn::GetAtt': [
                  'HwasurrDotIoAmplifydev7AC082A7',
                  'BranchName'
                ]
              }
            }
          ]
        }
      }
    }
  }, MatchStyle.EXACT));
});
