if ( !Array.prototype.every ) {
  Array.prototype.every = function ( fun ) {
    'use strict';
    var t, len, i, thisp;
    if ( this == null ) {
      throw new TypeError();
    }
    t = Object( this );
    len = t.length >>> 0;
    if ( typeof fun !== 'function' ) {
      throw new TypeError();
    }
    thisp = arguments[1];
    for ( i = 0; i < len; i++ ) {
      if ( i in t && !fun.call( thisp, t[i], i, t ) ) {
        return false;
      }
    }
    return true;
  };
}

if ( !Array.prototype.filter ) {
  Array.prototype.filter = function ( fun ) {
    'use strict';
    if ( !this ) {
      throw new TypeError();
    }
    var objects = Object( this );
    var len = objects.length >>> 0;
    if ( typeof fun !== 'function' ) {
      throw new TypeError();
    }
    var res = [];
    var thisp = arguments[1];
    for ( var i in objects ) {
      if ( objects.hasOwnProperty( i ) ) {
        if ( fun.call( thisp, objects[i], i, objects ) ) {
          res.push( objects[i] );
        }
      }
    }
    return res;
  };
}

if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function ( fn, scope ) {
    'use strict';
    var i, len;
    for ( i = 0, len = this.length; i < len; ++i ) {
      if ( i in this ) {
        fn.call( scope, this[i], i, this );
      }
    }
  };
}

if ( !Array.prototype.indexOf ) {
  Array.prototype.indexOf = function ( searchElement ) {
    'use strict';
    if ( this == null ) {
      throw new TypeError();
    }
    var n, k, t = Object( this ),
    len = t.length >>> 0;

    if ( len === 0 ) {
      return -1;
    }
    n = 0;
    if ( arguments.length > 1 ) {
      n = Number( arguments[1] );
      if ( n != n ) {
        n = 0;
      } else if ( n != 0 && n != Infinity && n != -Infinity ) {
        n = (n > 0 || -1) * Math.floor( Math.abs( n ) );
      }
    }
    if ( n >= len ) {
      return -1;
    }
    for ( k = n >= 0 ? n : Math.max( len - Math.abs( n ), 0 ); k < len; k++ ) {
      if ( k in t && t[k] === searchElement ) {
        return k;
      }
    }
    return -1;
  };
}

if ( !Array.prototype.lastIndexOf ) {
  Array.prototype.lastIndexOf = function ( searchElement ) {
    'use strict';
    if ( this == null ) {
      throw new TypeError();
    }
    var n, k,
    t = Object( this ),
    len = t.length >>> 0;
    if ( len === 0 ) {
      return -1;
    }
    n = len;
    if ( arguments.length > 1 ) {
      n = Number( arguments[1] );
      if ( n != n ) {
        n = 0;
      }
      else if ( n != 0 && n != (1 / 0) && n != -(1 / 0) ) {
        n = (n > 0 || -1) * Math.floor( Math.abs( n ) );
      }
    }
    for ( k = n >= 0
    ? Math.min( n, len - 1 )
    : len - Math.abs( n ); k >= 0; k-- ) {
      if ( k in t && t[k] === searchElement ) {
        return k;
      }
    }
    return -1;
  };
}

if ( !Array.prototype.map ) {
  Array.prototype.map = function ( callback, thisArg ) {
    var T, A, k;
    if ( this == null ) {
      throw new TypeError( " this is null or not defined" );
    }
    var O = Object( this );
    var len = O.length >>> 0;
    if ( typeof callback !== "function" ) {
      throw new TypeError( callback + " is not a function" );
    }
    if ( thisArg ) {
      T = thisArg;
    }
    A = new Array( len );
    k = 0;
    while ( k < len ) {
      var kValue, mappedValue;
      if ( k in O ) {
        kValue = O[ k ];
        mappedValue = callback.call( T, kValue, k, O );
        A[ k ] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

if ( 'function' !== typeof Array.prototype.reduce ) {
  Array.prototype.reduce = function ( callback, opt_initialValue ) {
    'use strict';
    if ( null === this || 'undefined' === typeof this ) {
      throw new TypeError(
      'Array.prototype.reduce called on null or undefined' );
    }
    if ( 'function' !== typeof callback ) {
      throw new TypeError( callback + ' is not a function' );
    }
    var index, value,
    length = this.length >>> 0,
    isValueSet = false;
    if ( 1 < arguments.length ) {
      value = opt_initialValue;
      isValueSet = true;
    }
    for ( index = 0; length > index; ++index ) {
      if ( this.hasOwnProperty( index ) ) {
        if ( isValueSet ) {
          value = callback( value, this[index], index, this );
        }
        else {
          value = this[index];
          isValueSet = true;
        }
      }
    }
    if ( !isValueSet ) {
      throw new TypeError( 'Reduce of empty array with no initial value' );
    }
    return value;
  };
}

if ( 'function' !== typeof Array.prototype.reduceRight ) {
  Array.prototype.reduceRight = function ( callback, opt_initialValue ) {
    'use strict';
    if ( null === this || 'undefined' === typeof this ) {
      throw new TypeError(
      'Array.prototype.reduceRight called on null or undefined' );
    }
    if ( 'function' !== typeof callback ) {
      throw new TypeError( callback + ' is not a function' );
    }
    var index, value,
    length = this.length >>> 0,
    isValueSet = false;
    if ( 1 < arguments.length ) {
      value = opt_initialValue;
      isValueSet = true;
    }
    for ( index = length - 1; -1 < index; --index ) {
      if ( !this.hasOwnProperty( index ) ) {
        if ( isValueSet ) {
          value = callback( value, this[index], index, this );
        }
        else {
          value = this[index];
          isValueSet = true;
        }
      }
    }
    if ( !isValueSet ) {
      throw new TypeError( 'Reduce of empty array with no initial value' );
    }
    return value;
  };
}

if ( !Array.prototype.some ) {
  Array.prototype.some = function ( fun ) {
    'use strict';
    if ( this == null ) {
      throw new TypeError();
    }
    var thisp, i,
    t = Object( this ),
    len = t.length >>> 0;
    if ( typeof fun !== 'function' ) {
      throw new TypeError();
    }
    thisp = arguments[1];
    for ( i = 0; i < len; i++ ) {
      if ( i in t && fun.call( thisp, t[i], i, t ) ) {
        return true;
      }
    }

    return false;
  };
}