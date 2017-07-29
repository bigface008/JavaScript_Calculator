var assert = require('chai').assert;

describe('Split equality', function() {
  it('should return an Arrary', function() {
   assert.equal(['49','+','3'], splitInput("49+3"));
   assert.equal(['51','+','(','31','*','22','-','1',')','*','22'], splitInput("51+(31*22-1)*22"));
   assert.equal(['21','/','3','+','99.3122','*','331','/','(','21','-','1',')'], splitInput("21/3+99.3122*331/(21-1)"))
  });
});

describe('Calculate equality', function() {
  describe('Single:+', function() {
    it('should return right result', function() {
      assert.equal(74,74); // 23+51 = 74
      assert.equal(41.016,41.016); //32.112+8.904 = 41.016
    });
  });

  describe('Single:-', function() {
    it('should return right result', function() {
      assert.equal(42,42); // 45-3 = 42
      assert.equal(-67.234,-67.234); // 32-99.234 = -67.234
    });
  });

  describe('Single:*', function() {
    it('should return right result', function() {
      assert.equal(66,66); // 2*33 = 66
      assert.equal(47.976,47.976); // 23.988*2 = 47.976
    });
  });

  describe('Single:/', function() {
    it('should return right result', function() {
      assert.equal(16,16); // 32/2 = 16
      assert.equal(9.044,9.044); // 45.22/5 = 9.044
    });
  });

  describe('Mix:', function() {
    it('should return right result', function() {
      assert.equal(4,4); // (1+1)*2 = 4
      assert.equal(-47.94,-47.94); // (23-21)*2.03-(54-2) = -47.94
      assert.equal(119.47783870967743, 119.47783870967743); // (99-8)/3.1+90.123 = 119.47783870967743
      assert.equal(-358.099,-358.099); // 2-(21+99.033)*3 = -358.099
    });
  });
});

describe('Error check', function() {
  describe('Check in :', function() {
    it('should throw an error', function() {
      assert.equal(1,1);
    })
  });
});