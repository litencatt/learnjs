describe('lambda function', function() {
  var index = require('index');
  var context;

  beforeEach(function() {
    context = jasmine.createSpyObj('context', ['succeed', 'fail']);
    index.dynamoDb = jasmine.createSpyObj('dynamo', ['scan']);
  });

  describe('popularAnswers', function() {
    it('returns problems with the given problem number', function() {
      index.popularAnswers({problemNumber: 42}, context);
      expect(index.dynamoDb.scan).toHaveBeenCalledWith({
        FilterExpression: "problemId = :problemId",
        ExpressionAttributeValues: { ":problemId": 42 },
        TableName: 'learnls'
      }, jasmine.any(Function));
    });

    it ('group answers by minified code', function() {
      index.popularAnswers({problemNumber: 1}, context);
      index.dynamoDb.scan.calls.first().args[1](undefined, {Items: [
        {answer: "true"},
        {answer: "true"},
        {answer: "true"},
        {answer: "!false"},
        {answer: "!false"},
      ]});
      expect(context.succeed).toHaveBeenCalledWith({"true": 3, "!false": 2});
    });
  });
});
