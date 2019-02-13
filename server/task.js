var stdin = process.stdin;
stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf8' );

var on;
var off;
var off_set;
function online(){
    on = setInterval(function(){
        console.log('online')
    }, 1000)
    
    off_set = setTimeout(offline,5000)
}

function end(){
    clearInterval(off);
    clearTimeout(off_set)
    clearInterval(on);
    online()
}

function offline(){
    clearInterval(on)
    off = setInterval(function(){
        console.log('offline')
    }, 1000)

}

stdin.on( 'data', function( key )
    {
        if('SIGINT') {
            // console.log('get out')
            process.exit();
        } 
        else//if ( key ) 
        {
            end();
        } 
    }) 

online()