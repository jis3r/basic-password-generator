function init() 
{
    chooseWallpaper();
    generatePassword();
}

function chooseWallpaper() 
{
    random = Math.floor( Math.random() * 4 );

    switch (random) {
        case 0:
            document.getElementById("body").style.backgroundImage = "url('0.jpg')";
            break;
        case 1:
            document.getElementById("body").style.backgroundImage = "url('1.jpg')";
            break;
        case 2:
            document.getElementById("body").style.backgroundImage = "url('2.jpg')";
            break;
        case 3:
            document.getElementById("body").style.backgroundImage = "url('3.jpg')";
            break;
        default:
            document.getElementById("body").style.backgroundImage = "url('1.jpg')";
          break;
      }
}


function updateLength() 
{
    document.getElementById( "length" ).value = parseInt( document.getElementById( "pwlength" ).value );
}

function generatePassword() 
{
    let length = parseInt( document.getElementById( "pwlength" ).value );
    let ascii = -1;
    let stringPart= '';
    let printChar = false;
    let newPassword = '';
    let letters = document.getElementById( "letters" ).checked;
    let numbers = document.getElementById( "numbers" ).checked;
    let symbols = document.getElementById( "symbols" ).checked;
    let count = 0;


    if( letters === false && numbers === false && symbols === false )
    {
        length = 0;
        newPassword = '';        
    }
    else
    {
        for( let i = 0; i< length; i++ ){
            ascii = Math.floor( Math.random() * 94 + 33 );
            stringPart = String.fromCharCode(ascii);
            count++;
    
            if ( ( (ascii > 64) && (ascii < 91) ) || ( (ascii > 96) && (ascii < 123) ) )
            {
                printChar = letters;
            }
            else if( (ascii > 47) && (ascii < 58) )
            {
                printChar = numbers;
            }
            else if( ( (ascii > 32) && (ascii < 48) ) || ( (ascii > 57) && (ascii < 65) ) || ( (ascii > 90) && (ascii < 97) ) || ( (ascii > 122) && (ascii < 127) ) )
            {
                printChar = symbols;
            }
    
            if( printChar === true )
            {
                newPassword += stringPart;
            }
            else
            {
                i = i - 1;
            }
        }
    }
    document.getElementById( "pw" ).value = newPassword;
    changeSafetyStatus(length);
    //console.log(count);

    navigator.clipboard.writeText(newPassword).then(function() {
        //console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
    console.error('Async: Could not copy text: ', err);
});
}


function changeSafetyStatus(length) {
    if (length < 1)
    {
        document.getElementById("safetyIndicator").style.backgroundColor = "rgb(11, 95, 153)";
        document.getElementById("safetyIndicatorContent").innerHTML="Safety";
    }
    else if (length < 8)
    {
        document.getElementById("safetyIndicator").style.backgroundColor = "rgb(254, 51, 51)";
        document.getElementById("safetyIndicatorContent").innerHTML="Unsecure";
    }
    else if(length < 16)
    {
        document.getElementById("safetyIndicator").style.backgroundColor = "rgb(255, 174, 0)";
        document.getElementById("safetyIndicatorContent").innerHTML="Moderate";
    }
    else if (length < 64)
    {
        document.getElementById("safetyIndicator").style.backgroundColor = "rgb(0, 191, 57)";//rgb(116, 201, 116)
        document.getElementById("safetyIndicatorContent").innerHTML="Safe";
    }
    else
    {
        document.getElementById("safetyIndicator").style.backgroundColor = "rgb(0, 191, 57)";//rgb(116, 201, 116)
        document.getElementById("safetyIndicatorContent").innerHTML="Nice";
    }
}