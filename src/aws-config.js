const AwsConfig = {
  Auth: {
    identityPoolId: 'eu-west-1:5b05d3df-aca5-4343-9a8e-d79027d62797',
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_KpVRQ2VkK',
    userPoolWebClientId: '41el1d9uqrdnmau42h7uqo6brr'
  },
  API: {
    endpoints: [
      {
        name: 'adminAPI',
        endpoint: 'https://8xj7y33tse.execute-api.eu-west-1.amazonaws.com/server',
        region: 'eu-west-1'
      }
    ]
  }
};

export default AwsConfig;
