import expect from 'expect-legacy';
import flattenActionMap from '../src/utils/flattenActionMap';

describe('flattenActionMap', () => {
  it('flattens an action map with the default dividerr', () => {
    const actionMap = {
      APP: {
        COUNTER: {
          INCREMENT: amount => ({ amount }),
          DECREMENT: amount => ({ amount: -amount })
        },
        NOTIFY: (username, message) => ({ message: `${username}: ${message}` })
      },
      LOGIN: username => ({ username })
    };

    expect(flattenActionMap(actionMap)).toEqual({
      'APP/COUNTER/INCREMENT': actionMap.APP.COUNTER.INCREMENT,
      'APP/COUNTER/DECREMENT': actionMap.APP.COUNTER.DECREMENT,
      'APP/NOTIFY': actionMap.APP.NOTIFY,
      LOGIN: actionMap.LOGIN
    });
  });

  it('does nothing to an already flattened map', () => {
    const actionMap = {
      INCREMENT: amount => ({ amount }),
      DECREMENT: amount => ({ amount: -amount }),
      LOGIN: username => ({ username })
    };

    expect(flattenActionMap(actionMap)).toEqual(actionMap);
  });

  it('is case-sensitive', () => {
    const actionMap = {
      app: {
        counter: {
          increment: amount => ({ amount }),
          decrement: amount => ({ amount: -amount })
        },
        notify: (username, message) => ({ message: `${username}: ${message}` })
      },
      login: username => ({ username })
    };

    expect(flattenActionMap(actionMap)).toEqual({
      'app/counter/increment': actionMap.app.counter.increment,
      'app/counter/decrement': actionMap.app.counter.decrement,
      'app/notify': actionMap.app.notify,
      login: actionMap.login
    });
  });

  it('uses a custom divider string', () => {
    const actionMap = {
      APP: {
        COUNTER: {
          INCREMENT: amount => ({ amount }),
          DECREMENT: amount => ({ amount: -amount })
        },
        NOTIFY: (username, message) => ({ message: `${username}: ${message}` })
      },
      LOGIN: username => ({ username })
    };

    expect(flattenActionMap(actionMap, { divider: '-' })).toEqual({
      'APP-COUNTER-INCREMENT': actionMap.APP.COUNTER.INCREMENT,
      'APP-COUNTER-DECREMENT': actionMap.APP.COUNTER.DECREMENT,
      'APP-NOTIFY': actionMap.APP.NOTIFY,
      LOGIN: actionMap.LOGIN
    });
  });

  it('handles prefix option', () => {
    const actionMap = {
      APP: {
        COUNTER: {
          INCREMENT: amount => ({ amount }),
          DECREMENT: amount => ({ amount: -amount })
        },
        NOTIFY: (username, message) => ({ message: `${username}: ${message}` })
      },
      LOGIN: username => ({ username })
    };

    expect(flattenActionMap(actionMap, { prefix: 'my' })).toEqual({
      'my/APP/COUNTER/INCREMENT': actionMap.APP.COUNTER.INCREMENT,
      'my/APP/COUNTER/DECREMENT': actionMap.APP.COUNTER.DECREMENT,
      'my/APP/NOTIFY': actionMap.APP.NOTIFY,
      'my/LOGIN': actionMap.LOGIN
    });
  });

  it('handles prefix + divider options', () => {
    const actionMap = {
      APP: {
        COUNTER: {
          INCREMENT: amount => ({ amount }),
          DECREMENT: amount => ({ amount: -amount })
        },
        NOTIFY: (username, message) => ({ message: `${username}: ${message}` })
      },
      LOGIN: username => ({ username })
    };

    expect(flattenActionMap(actionMap, { divider: '-', prefix: 'my' })).toEqual(
      {
        'my-APP-COUNTER-INCREMENT': actionMap.APP.COUNTER.INCREMENT,
        'my-APP-COUNTER-DECREMENT': actionMap.APP.COUNTER.DECREMENT,
        'my-APP-NOTIFY': actionMap.APP.NOTIFY,
        'my-LOGIN': actionMap.LOGIN
      }
    );
  });
});
