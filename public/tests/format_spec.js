learnjs.formatCode = function(obj) {
  return obj;
};

function formatProblems() {
  var formattedProblems = [];
  learnjs.problems.forEach(function(problem) {
    formattedProblems.push({
      code: learnjs.formatCode(problem.code),
      name: problem.name
    });
  });
  return formattedProblems;
}

function betterFormatProblems() {
  return learnjs.problems.map(formatCode).sort(byName);
}

describe('betterFormatProblems', function() {
  beforeEach(function() {
    spyOn(learnjs, 'formatCode').and.callFake(function(problem) {
      return {
        code: 'formatted',
        name: problem.name
      }
    });
  });

  it('applies a formatter to all the problems', function() {
    expect(betterFormatProblems()[0].code).toEqual("formatted");
  });
});

describe('formattedProblems', function() {
  beforeEach(function() {
    spyOn(learnjs, 'formatCode').and.returnValue("formatted")
  });

  it('applies a formatter to all the problems', function() {
    expect(formatProblems()[0].code).toEqual("formatted");
  });
});
