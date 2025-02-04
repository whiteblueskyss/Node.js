
// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//       getTopMovies((movies) => {
//         console.log('Top movies: ', movies);
//         sendEmail(customer.email, movies, () => {
//           console.log('Email sent...')
//         });
//       });
//     }
//   });

  async function mail() {
    try{
        const customer = await getCustomer(1);
        console.log(customer);
        if(customer.isGold){
            const topMovies = await getTopMovies();
            console.log(topMovies);

            const mailed = await sendEmail(customer.email, topMovies);
            console.log("mail sent.....");
        }
    }
    catch(error){
        console.log(error);
    }
  }

  mail();
  
  function getCustomer(id) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve({ 
              id: 1, 
              name: 'Mosh Hamedani', 
              isGold: true, 
              email: 'email' 
            });
          }, 4000); 
    }) 
  }
  
  function getTopMovies() {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
          }, 4000);
    })
  }
  
  function sendEmail(email, movies, callback) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve();
          }, 4000);
    })
  }