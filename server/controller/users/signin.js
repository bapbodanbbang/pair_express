const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    // TODO : 유저가 로그인을 했을 때, 회원정보를 데이터베이스에서 확인하고, 회원의 id를 session에 담아주도록 구현하세요.
    /**
     * 1. POST 요청이 /user/signin 으로 날아오는 것을 핸들링하라
     *  email, password 라는 Key 를 담은 형태로 날아옴
     * 2. 그렇게 받은 값을 통해서 validity 를 검증하라
     *  email. password가 모두 일치하는 값만 data로 전달됨
     *  그러므로 data 가 있다면? -> req.session.userid에 data의 id 값 할당 후 응답
     *  data 가 없다면 404와 'unvalid user' 응답
     */
    let userData = req.body;
    users
      .findOne({
        where: {
          email: userData.email,
          password: userData.password,
        },
      })
      .then((data) => {
        // console.log('findOne data', data); // dataValues...등등
        // console.log('data.dataValues.id', data.dataValues.id); // 아이디 정상출력
        // console.log('data.id', data.id); // 아이디 정상출력

        if (data) {
          req.session.userid = data.id;
          console.log(req.session.userid);
          res.send({ id: req.session.userid });
        } else {
          res.status(404).send('unvalid user');
        }

        // if (data === null) {
        //   // 일치하는 데이터가 없으면
        //   res.status(404).send('unvalid user');
        // } else {
        //   // 일치하는 데이터 있음
        //   if (req.session.userid === undefined) {
        //     // 세션 아이디가 없음
        //     req.session.userid = data.dataValues.id;
        //   }
        //   res.json(data);
        // }
      });
  },
};
