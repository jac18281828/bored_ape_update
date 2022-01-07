import { expect } from "chai";
import { mock, when, instance } from "ts-mockito";

describe('simpleGreeting', function() {

    it('should say hello', function() {
        expect('hello').to.equal('hello');
    });

});

