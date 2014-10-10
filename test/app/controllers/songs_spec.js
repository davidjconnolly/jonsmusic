describe('songsController Test', function() {
  var httpBackend
  var controller
  var rootScope
  var scope

  beforeEach(module('jonsmusicApp'));

  beforeEach(inject(function($httpBackend, $controller, $rootScope) {

    $httpBackend.when('GET', '/api/songs').respond({
      "id": 1,
      "title": "Foo Song",
      "date": "2014-08-30T01:44:29.849Z",
      "lyrics": "Lorem ipsum dolor sit amet, eu usu prompta ponderum dissentiet, est agam putant eripuit ne, id aliquip discere delicatissimi cum. Populo putant reprehendunt ex vis. Soluta eligendi similique qui ne, nec summo repudiare ne. Vim magna choro saperet ad, ad vide viris evertitur vix. Ad choro utroque ocurreret cum, ei vix solet dolorem. Has petentium salutandi at. Eripuit prodesset similique eu vel. Stet nulla saepe mel et, cum at ipsum primis, impetus mentitum ei sea. Te invenire explicari has. His te mollis periculis, fabulas nominati qui ad, his et alia iisque reprehendunt. Ea sea salutatus democritum, movet dissentiunt an duo, cum elitr fabulas appellantur te. Suavitate adipiscing pri ea, vivendum ullamcorper ad vis. Te sed amet aeque nobis. Ne lorem dolor mel, at sea assum oportere comprehensam. Has et detraxit instructior contentiones. Id quo aperiri commune, vel quodsi commune et. Ponderum detraxit ex eam, mazim liberavisse ex ius, cu sit eros sale. Aliquip expetenda ad cum. Iudico utamur inermis no ius, tation putent assentior eos ut. Mel an nemore tibique assentior, ea eros dicit inimicus has, minimum quaerendum vel eu. Qui eu saperet mediocritatem, his probo delicata no, ei legere convenire complectitur vix. Ut odio ponderum usu, sea quot mentitum in, duo ad corpora urbanitas. Ius id dolor deleniti perpetua, solum verear vivendum an eum. Quodsi accumsan ius ea. Et his aliquando accommodare, eos malis nostro corrumpit id, repudiare percipitur cu has. Utinam similique ad ius. Oratio repudiare elaboraret no vim, nobis fabellas temporibus mei ea. His cu cotidieque mediocritatem, et tale sint tollit pri, ea elitr vocent accommodare vim. Iusto congue possit te quo."
    });
    httpBackend = $httpBackend

    controller = $controller
    rootScope = $rootScope
    // scope = $rootScope.$new()

    createController = function() {
      return controller('songsListController', {'$scope' : $rootScope });
    };
  }));
  
  it('should return notes array with two elements initially and then add one', function() {
    var cont = createController();
    httpBackend.flush();
    console.log(rootScope.songs);
  });

});
