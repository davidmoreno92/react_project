const tournParams = {
    id: uuid(),
    potType: 'R',  //S para torneos en especie y R para torneos normales
    //topicId:'garcia', //CAMPO TOPIC SOLO PARA BILLIONS 
    gameId: '75a8899b-c572-445f-bbf9-7b9027ecf7ca', //GAMEID
    potImg:'',
    potImgUrl:'monday.jpg', 
    backgroundImage: '',
    date: Date.now(),
    token: randomstring.generate(),
    start: Date.UTC(2020, 5, 29, 9, 0, 0),
    end: Date.UTC(2020, 5, 30, 21, 50, 0),
    feeAmout:0.3,
    potAmount:5,
    minFees: Number(Math.ceil(17/1)),
    title: [
      {
        lang: 'en',
        name: 'Monday Funday'
      }, {
        lang: 'es',
        name: 'Monday Funday'
      }
    ],
    rewards: [
      {
      position: 1,
      amount:5,
      currency: 'EUR',
      type: 'R'
    }
      ,
      {
        position: 2,
        amount:5,
        currency: 'EUR',
        type: 'R'
      }
  //estructura torneos especie
      // {
      //   position: 1,
      //   amount: 5,
      //  imgUrl:'0d134801-7018-426f-ae83-df6a522d2c11_reward_0.jpg', 
      //    imagen del premio
      //   currency: 'EUR',
      //       title: [
      //     {
      //       lang: 'es',
      //       name: `RON`
      //     },
      //     {
      //       lang: 'en',
      //       name: `RON`
      //     }
      //   ],
      //   type: 'S'
      // }
    ]
  };
          let tourn = {
          id: tournParams.id,
          created: Date.now(),
          updated: Date.now(),
          //subType: 'daily',  //solo para los dailys
          curPlayers: 0,
          date: tournParams.date,
          token: tournParams.token,
          //topicId: tournParams.topicId,
          start: tournParams.start,
          img: tournParams.backgroundImage,
          imgUrl: 'monday.jpg', // ----> para cuando se pasen a s3
          end: tournParams.end,
          title: tournParams.title,
          gameId: tournParams.gameId,
          guaranty: 0,
          //code:'welcome',  codigo de torneos privados
          priv: false,
          live: true, 
          logo: 2,
          minFees: tournParams.minFees,
          rewards: tournParams.rewards,
          fee: {
            amount: tournParams.feeAmout,
            currency: 'EUR',
            type: 'R'
          },
          pot: {
            amount: tournParams.potAmount,
            currency: 'EUR',
            fake: 0,
            //img:  ---> pot img
            //imgUrl: tournParams.potImgUrl, // imagen del pot
            gems: 0,
            title: [
              {
                lang: 'es',
                name: ' '
              }
            ],
            type: tournParams.potType
          },
          rules: [
            {
              lang: 'es',
              name: '¡Alcanza el puesto más alto!\nParticipa tantas veces como quieras para mejorar tu puntuación'
            },
            {
              lang: 'en',
              name: 'Reach the top!\nPlay as many times as you want to improve your score'
            },
            {
              lang: 'fr',
              name: 'Atteins le sommet!\nJoue autant de fois que tu veux pour améliorer ton score'
            }
          ],
          state: 'C',
          type: 'S',
          tz: 'Europe/Madrid',
          url: 'https://www.egogames.com/games.html'
        };
    