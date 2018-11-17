describe('LearnJS', function() {
  it('can show a probrem view', function() {
    learnjs.showView('#probrem-1');
    expect($('.view-container .probrem-view').length).toEqual(1);
  });
});
