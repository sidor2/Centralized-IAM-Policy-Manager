import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import * as pipelines from 'aws-cdk-lib/pipelines';


export class CentralizedIamPolicyManagerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create a codecommit repository to store IAM policies in
    const repo = new codecommit.Repository(this, 'Repo', {
      repositoryName: 'iam-policies',
    });

    // create a pipeline to deploy the stack
    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      pipelineName: 'iam-policies',
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.codeCommit(repo, 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    
    

    
    
  }
}
