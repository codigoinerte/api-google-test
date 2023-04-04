let client_id = '495147047249-1spimj483r8arakm7qr9ld0ftht0d8vr.apps.googleusercontent.com';
let client_secret = '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';
//let redirect_uri = document.location.href.replace(/\/$/, "");
let redirect_uri = "https://api-google-test-production.up.railway.app";

const dta = {
    client_id,
    redirect_uri,
    scope: 'profile email openid',
    ux_mode: 'popup',
    state: 'codigoauth-random',

    callback: (tokenResponse) => {

      const { authuser, code, hd, prompt, scope } = tokenResponse;

      const datos = {
          code,
          redirect_uri
      };

      try {
        
          fetch('http://localhost/google/app/app.php',{
            method:'POST',
            headers: {
              "Content-Type": "application/json"
            },
  
            body: JSON.stringify(datos)
          })
          .then((response)=> response?.text() )
          .then((data)=>{
              console.log(data);
          }).catch(console.log);

      } catch (error) {
        console.log(error);
      }
        
        /*
        const { authuser, code, hd, prompt, scope } = tokenResponse;

        const datos = {
            code,
            sip:"google"
        }

        fetch('https://services-testing.babilonia.io/auth/exchange',{
            method:'POST',
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(datos)
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
        }).catch((error)=>console.log(error));
        
        return false;
        */
       
        /*
        // init code : codigo que sera procesado en backend
        
        const tokenEndpoint = 'https://oauth2.googleapis.com/token';

        const data = {
          code,
          client_id,
          client_secret,
          redirect_uri: 'http://127.0.0.1:5500',
          grant_type: 'authorization_code',
        };
    
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(data),
        };
    
        // obtener el token para deirigir a la web principal
    
        fetch(tokenEndpoint, options)
          .then(response => response.json())
          .then(data => {
            
            const accessToken = data.access_token;
        
            // consultar datos del usuario

            fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
                .then(data => data.json())
                .then((info) => {
                    console.log(info)
                    
            }).catch((error)=> console.log(error));

            // consultar datos del usuario
    
          })
          .catch(error => console.error('Error al obtener el token de acceso:', error));

        // end code
        */
    },
};

client = google.accounts.oauth2.initCodeClient(dta);

document.getElementById("login-google").addEventListener('click', function(){
  
    client.requestCode();
})