// 유효성 검사를 통과하지못했을 때 나오는 문구
const warning = {
  errorLength: "제한된 길이를 초과하였습니다.",
  errorBlank: "작성된 내용이 없습니다.",
  errorCuresWord: "제한된 문자가 사용되었습니다."
};

const registerText = {
  id: {
    pass: "사용할 수 있는 아이디 입니다.",
    errorExist: "사용중인 아이디가 존재합니다.",
    errorLength: "아이디의 길이는 4 ~ 10 글자입나다.",
    errorBlank: "아이디에 공백이 들어갈 수 없습니다."
  },
  pw: {
    pass: "사용할 수 있는 비밀번호 입니다.",
    errorLength: "비밀번호의 길이는 4 ~ 15 글자입니다."
  },
  nickname: {
    pass: "사용할 수 있는 닉네임입니다.",
    errorLength: "닉네임의 길이는 1 ~ 10 글자입나다.",
    errorExist: "사용할 수 없는 닉네임입니다."
  },
  errorBlank: "필수 정보입니다."
};

// 유효성 검사에 사용될 길이 제한
const limitLength = {
  content: 300,
  id: [4, 10],
  pw: [4, 15],
  nickname: [1, 10]
};

// 문자의 길이수가 제한 사항에 맞는지 확인하는 함수
function checkLength(str, limitLength) {
  const checkMinLength = typeof limitLength === "object";

  if (checkMinLength) {
    const [min, max] = limitLength;
    return str.length >= min && str.length <= max ? true : false;
  } else {
    return str.length <= limitLength ? true : false;
  }
}

// 입력된 문자에 공백이 들어갔는지
function checkBlank(str) {
  return str.trim().length !== 0 ? true : false;
}

function checkIncludesBlank(str) {
  return !str.includes(" ");
}

// 입력된 문자에 욕설이 있는지 확인하는 함수
function checkCurseWord(str) {
  const reg = new RegExp(
    /(씹|썅|18놈|18새끼|ㄱㅐㅅㅐㄲl|ㄱㅐㅈㅏ|강간|개가튼년|개가튼뇬|개같은년|개걸레|개고치|개너미|개넘|개년|개놈|개늠|개똥|개떵|개떡|개라슥|개보지|개부달|개부랄|개불랄|개붕알|개새|개세|개쓰래기|개쓰레기|개씁년|개씁블|개씁자지|개씨발|개씨블|개자식|개자지|개잡년|개젓가튼넘|개좆|개지랄|개후라년|개후라들놈|개후라새끼|걔잡년|걸래년|걸레같은년|걸레년|걸레핀년|게부럴|게세끼|게새끼|게늠|게자식|게지랄놈|깨쌔끼|난자마셔|난자먹어|난자핧아|내꺼빨아|내꺼핧아|내버지|내자지|내잠지|내조지|너거애비|니기미|니뿡|니뽕|니씨브랄|니아범|니아비|니애미|니애뷔|니애비|니할애비|닝기미|닌기미|니미|닳은년|돈새끼|돌으년|돌은넘|돌은새끼|딸딸이|똥구녁|똥꾸뇽|똥구뇽|똥|띠발뇬|띠팔|띠펄|띠풀|띠벌|띠벨|띠빌|막간년|맛간년|맛없는년|맛이간년|멜리스|미친구녕|미친구멍|미친넘|미친년|미친놈|미친눔|미친새끼|미친쇄리|미친쇠리|미친쉐이|미친씨부랄|미튄|미티넘|미틴|미틴넘|미틴년|미틴놈|미틴것|백보지|버따리자지|버지구녕|버지구멍|버지냄새|버지따먹기|버지뚫어|버지뜨더|버지물마셔|버지벌려|버지벌료|버지빨아|버지빨어|버지썰어|버지쑤셔|버지털|버지핧아|버짓물|버짓물마셔|벌창같은년|벵신|병닥|병딱|병신|보쥐|보지|보지핧어|보짓물|보짓물마셔|봉알|부랄|불알|붕알|붜지|뷩딱|븅쉰|븅신|빙띤|빙신|빠가십새|빠가씹새|빠구리|빠굴이|뻑큐|뽕알|뽀지|뼝신|사까시|상년|새꺄|새뀌|새끼|색갸|색끼|색키|샤발|써글|써글년|세꺄|세끼|섹히|쉐끼|쉑갸|쉬발|쉬방|쉬밸년|쉬벌|쉬불|쉬붕|쉬빨|쉬이발|쉬이방|쉬이벌|쉬이불|쉬이붕|쉬이빨|쉬이팔|쉬이펄|쉬이풀|쉬팔|쉬펄|쉬풀|쉽쌔|시댕이|시발|시발년|시발놈|시발새끼|시방새|시밸|시벌|시불|시붕|시이발|시이벌|시이불|시이붕|시이팔|시이펄|시이풀|시팍새끼|시팔|시팔넘|시팔년|시팔놈|시팔새끼|시펄|실프|십8|십때끼|십떼끼|십버지|십부랄|십부럴|십새|십세이|십셰리|십쉐|십자석|십자슥|십지랄|십창녀|십창|십탱|십탱구리|십탱굴이|십팔새끼|ㅆㅣ|쌍넘|쌍년|쌍놈|쌍눔|쌍보지|쌔끼|쌔리|썅년|썅놈|썅뇬|썅늠|쓉새|쓰바새끼|쓰브랄쉽세|씌발|씌팔|씨가랭넘|씨가랭년|씨가랭놈|씨발|씨발년|씨발롬|씨발병신|씨방새|씨방세|씨밸|씨뱅가리|씨벌|씨벌년|씨벌쉐이|씨부랄|씨부럴|씨불|씨불알|씨붕|씨브럴|씨블|씨블년|씨븡새끼|씨빨|씨이발|씨이벌|씨이불|씨이붕|씨이팔|씨파넘|씨팍새끼|씨팍세끼|씨팔|씨펄|씨퐁넘|씨퐁뇬|씨퐁보지|씨퐁자지|씹년|씹물|씹미랄|씹버지|씹보지|씹부랄|씹브랄|씹빵구|씹뽀지|씹새|씹새끼|씹세|씹쌔끼|씹자석|씹자슥|씹자지|씹지랄|씹창|씹창녀|씹탱|씹탱굴이|씹탱이|씹팔|애미|애미랄|애미보지|애미씨뱅|애미자지|애미잡년|애미좃물|애비|애자|어미따먹자|어미쑤시자|영자|엄창|에미|에비|엔플레버|엠플레버|염병|염병할|염뵹|엿먹어라|왕버지|왕자지|왕잠지|왕털버지|왕털보지|왕털자지|왕털잠지|우미쑤셔|육갑|자기핧아|자지|자지구녕|자지구멍|자지꽂아|자지넣자|자지뜨더|자지뜯어|자지박어|자지빨아|자지빨아줘|자지빨어|자지쑤셔|자지쓰레기|자지정개|자지짤라|자지털|자지핧아|자지핧아줘|자지핧어|작은보지|잠지|잠지뚫어|잠지물마셔|잠지털|잠짓물마셔|잡년|잡놈|저년|점물|젓가튼|젓가튼쉐이|젓같내|젓같은|젓까|젓나|젓냄새|젓대가리|젓떠|젓마무리|젓만이|젓물|젓물냄새|젓밥|정액마셔|정액먹어|정액발사|정액짜|정액핧아|정자마셔|정자먹어|정자핧아|젖같은|젖까|젖밥|젖탱이|조개넓은년|조개따조|조개마셔줘|조개벌려조|조개속물|조개쑤셔줘|조개핧아줘|조까|조또|족같내|족까|족까내|존나|존나게|존니|졸라|좀마니|좀물|좀쓰레기|좁빠라라|좃가튼뇬|좃간년|좃까|좃까리|좃깟네|좃냄새|좃넘|좃대가리|좃도|좃또|좃만아|좃만이|좃만한것|좃만한쉐이|좃물|좃물냄새|좃보지|좃부랄|좃빠구리|좃빠네|좃빠라라|좃털|좆같은놈|좆같은새끼|좆까|좆까라|좆나|좆년|좆도|좆만아|좆만한년|좆만한놈|좆만한새끼|좆먹어|좆물|좆밥|좆빨아|좆새끼|좆털|좋만한것|주글년|주길년|쥐랄|지랄|지랼|지럴|지뢀|쪼까튼|쪼다|쪼다새끼|찌랄|찌질이|창남|창녀|창녀버지|창년|처먹고|처먹을|쳐먹고|쳐쑤셔박어|촌씨브라리|촌씨브랑이|촌씨브랭이|크리토리스|큰보지|클리토리스|트랜스젠더|페니스|항문수셔|항문쑤셔|허덥|허버리년|허벌년|허벌보지|허벌자식|허벌자지|허접|허젚|허졉|허좁|헐렁보지|혀로보지핧기|호냥년|호로|호로새끼|호로자슥|호로자식|호로짜식|호루자슥|호모|호졉|호좁|후라덜넘|후장|후장꽂아|후장뚫어|흐접|흐젚|흐졉|bitch|fuck|fuckyou|nflavor|penis|pennis|pussy)/gi
  );
  return str.search(reg) === -1 ? true : false;
}

// =================================

/**
 * 길이수 초과, 공백, 욕설을 확인하는 함수
 * @param {string} str
 * @param {number} limitLength
 * @returns
 * - 길이수 초과 :  "제한된 길이를 초과하였습니다."
 * - 공백 : "작성된 내용이 없습니다."
 * - 욕설 : "제한된 문자가 사용되었습니다."
 * - 통과 : true
 */
function validateText(str, limitLength) {
  const lengthCheck = checkLength(str, limitLength);
  const blankCheck = checkBlank(str);
  const curseWordCheck = checkCurseWord(str);

  if (!lengthCheck) {
    return warning.errorLength;
  }

  if (!blankCheck) {
    return warning.errorBlank;
  }

  if (!curseWordCheck) {
    return warning.errorCuresWord;
  }

  return true;
}

/**
 * 게시물의 닉네임과 내용의 유효성 검사하는 함수
 * @param {string} nickname 게시물 닉네임
 * @param {string} content 게시물 내용
 * @returns
 * - nickname에서 불통과 : `닉네임에서 [오류 문구]`
 * - content 불통과 : "내용에서 [오류 문구]"
 * - 통과 : true
 */
function validateLetter(nickname, content) {
  const checkNickname = validateText(nickname, limitLength.nickname);
  const checkContent = validateText(content, limitLength.content);

  if (checkNickname !== true) {
    return `닉네임에서 ${checkNickname}`;
  }
  if (checkContent !== true) {
    return `내용에서 ${checkContent}`;
  }
  if (checkNickname === true && checkContent === true) {
    return true;
  }
}

// TODO : existIdCheck 서버에 아이디가 존재하는지 확인하기
function validateId(value) {
  const lengthCheck = checkLength(value, limitLength.id);
  const includesBlankCheck = checkIncludesBlank(value);
  const existCheck = true;

  if (!lengthCheck) return { value: false, text: registerText.id.errorLength };
  if (!includesBlankCheck) return { value: false, text: registerText.id.errorBlank };
  if (!existCheck) return { value: false, text: registerText.id.errorExist };
  else {
    return { value: true, text: registerText.id.pass };
  }
}

function validatePw(value) {
  const lengthCheck = checkLength(value, limitLength.pw);

  if (!lengthCheck) return { value: false, text: registerText.pw.errorLength };
  else {
    return { value: true, text: registerText.pw.pass };
  }
}

// TODO : existIdCheck 서버에 닉네임이 존재하는지 확인하기
function validateNickname(value) {
  const lengthCheck = checkLength(value, limitLength.nickname);
  const blankCheck = checkBlank(value);
  const existCheck = true;

  if (!lengthCheck) return { value: false, text: registerText.nickname.errorLength };
  if (!blankCheck) return { value: false, text: registerText.errorBlank };
  if (!existCheck) return { value: false, text: registerText.nickname.errorExist };
  else {
    return { value: true, text: registerText.nickname.pass };
  }
}

export { validateText, validateLetter, validateId, validatePw, validateNickname };
