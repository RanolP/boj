"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dedent_1 = __importDefault(require("dedent"));
const yup = __importStar(require("yup"));
var Pirim;
(function (Pirim) {
    Pirim["Judging"] = "judging";
    Pirim["Kudegi"] = "kudegi";
    Pirim["IQ"] = "iq";
    Pirim["NumberTheory"] = "number-theory";
    Pirim["Cubing"] = "cubing";
    Pirim["MITM"] = "mitm";
    Pirim["N1"] = "n1";
    Pirim["Jongman"] = "jongman";
    Pirim["PrayMeta"] = "pray-meta";
    Pirim["Range"] = "range";
    Pirim["NM"] = "nm";
    Pirim["LinearFibo"] = "linear-fibo";
    Pirim["DB"] = "db";
    Pirim["SegtreeLazy"] = "segtree-lazy";
    Pirim["G3_1Try"] = "g3-1try";
    Pirim["ModNeg"] = "mod-neg";
    Pirim["Goin"] = "goin";
    Pirim["Nande"] = "nande";
    Pirim["DiaEscape"] = "dia-escape";
    Pirim["NextPermuation"] = "next-permuation";
    Pirim["Translate"] = "translate";
    Pirim["Choragi"] = "choragi";
    Pirim["Counter"] = "counter";
    Pirim["CodeForcesData"] = "cf-data";
    Pirim["Solved"] = "solved";
    Pirim["CodeForcesHacked"] = "cf-hacked";
    Pirim["DirtyGoinmul"] = "dirty-goinmul";
    Pirim["Div2AllSolve"] = "div2-all";
    Pirim["CodeForces1Minute"] = "cf-1m";
    Pirim["Overflow"] = "overflow";
    Pirim["NSquare"] = "n-square";
    Pirim["NLogN"] = "nlogn";
    Pirim["TLE"] = "tle";
    Pirim["Systest"] = "systest";
    Pirim["Parametric"] = "parametric";
    Pirim["Prime"] = "prime";
    Pirim["ProofByAC"] = "proof-by-ac";
    Pirim["Honey"] = "honey";
    Pirim["HelloWorld"] = "hello-world";
    Pirim["FirstGrade"] = "1st";
    Pirim["SeqQuery"] = "seq-query";
    Pirim["GoinKnowledge"] = "goin-knowledge";
    Pirim["Float128"] = "float128";
    Pirim["Lamen"] = "lamen";
    Pirim["JustSilver"] = "just-silver";
    Pirim["SampleAC"] = "sample-ac";
    Pirim["CubeloverMethod"] = "cubelover-method";
    Pirim["AC"] = "ac";
    Pirim["StdSort"] = "std-sort";
    Pirim["RemoveN"] = "remove-n";
    Pirim["FFTMultiplication"] = "fft-mul";
    Pirim["SPFASniped"] = "spfa-sniped";
    Pirim["Misread"] = "misread";
    Pirim["Greedy"] = "greedy";
    Pirim["NotEasy"] = "not-easy";
    Pirim["What"] = "what";
    Pirim["NPow5"] = "n^5";
    Pirim["ACwhyWALong"] = "ac-why-wa-long";
    Pirim["Confidence"] = "confidence";
    Pirim["StopGiman"] = "stop-giman";
    Pirim["WhatDataStructure"] = "what-data-structure";
    Pirim["Evande"] = "evande";
    Pirim["IamFool"] = "i-am-fool";
    Pirim["HowSolve"] = "how-solve";
    Pirim["WhatAlgorithm"] = "what-algorithm";
    Pirim["Minus2s"] = "-2s";
    Pirim["GimanGiveup"] = "giman-giveup";
    Pirim["BecomeGoinmul"] = "become-goinmul";
    Pirim["SCCTarjan"] = "scc-tarjan";
    Pirim["NotWellKnown"] = "not-wellknown";
    Pirim["EmptyPop"] = "empty-pop";
    Pirim["BitEven"] = "bit-even";
    Pirim["Aheui"] = "aheui";
    Pirim["HashBreaking"] = "hash-breaking";
    Pirim["Easy"] = "ez";
    Pirim["Purple"] = "purple";
    Pirim["Cpp17"] = "cpp17";
    Pirim["ZeroPercentWA"] = "0wa";
    Pirim["AboutTLE"] = "988ms";
    Pirim["EasyButYouHard"] = "easy-but-you-hard";
    Pirim["EyeGrep"] = "eye-grep";
    Pirim["ElevenDimensionTomato"] = "11dim-tomato";
    Pirim["GimanBeSqrt"] = "giman-be-sqrt";
    Pirim["HintPlease"] = "hint-plz";
    Pirim["ACwhyWA"] = "ac-why-wa";
    Pirim["TooBad"] = "too-bad";
    Pirim["NoShort"] = "no-short";
    Pirim["Codeup"] = "codeup";
    Pirim["AdvancedSort"] = "advanced-sort";
    Pirim["CounterPlease"] = "counter-please";
    Pirim["Hunsu"] = "hunsu";
    Pirim["LLVMPower"] = "llvm-power";
})(Pirim || (Pirim = {}));
const PirimMap = {
    [Pirim.Judging]: {
        id: '1227444960200396805',
        content: '백준 채점 중인 피림이',
        imageId: 'EQjCrIgWAAALzOh',
    },
    [Pirim.Kudegi]: {
        id: '1227445455887458304',
        content: '구데기 문제를 접한 피림이',
        imageId: 'EQjDISIXUAMZg6o',
    },
    [Pirim.IQ]: {
        id: '1227445635986620417',
        content: '능지 차이를 느낀 피림이',
        imageId: 'EQjDStwWAAAPz20',
    },
    [Pirim.NumberTheory]: {
        id: '1227445851032821765',
        content: '정수론을 싫어하는 피림이',
        imageId: 'EQjDfRgWAAQrM_s',
    },
    [Pirim.Cubing]: {
        id: '1227446131694723081',
        content: '큐빙을 추천받은 피림이',
        imageId: 'EQjDvnzXYAEv7wO',
    },
    [Pirim.MITM]: {
        id: '1227446647229120518',
        content: '킹리적갓심하는 피림이',
        imageId: 'EQjENspXUAIu2Eb',
    },
    [Pirim.N1]: {
        id: '1227447326500966401',
        content: 'N=1 검사 지적하는 피림이',
        imageId: 'EQjE1O-WkAI_7GF',
    },
    [Pirim.Jongman]: {
        id: '1227447550363492352',
        content: '종만북을 어려워하는 피림이',
        imageId: 'EQjFCQpWoAkOrzd',
    },
    [Pirim.PrayMeta]: {
        id: '1227447833160298496',
        content: 'TLE 풀이를 기도메타하는 피림이',
        imageId: 'EQjFR8-WoAEPSK3',
    },
    [Pirim.Range]: {
        id: '1227448028598022145',
        content: '값의 범위를 보고 기겁하는 피림이',
        imageId: 'EQjFd9CXsAMnVCc',
    },
    [Pirim.NM]: {
        id: '1227448176380174336',
        content: 'N과 M을 반대로 쓴 피림이',
        imageId: 'EQjFmGxWoAQbgsj',
    },
    [Pirim.LinearFibo]: {
        id: '1227448639389339648',
        content: '피보나치 수를 선형복잡도로밖에 못 구하는 피림이',
        imageId: 'EQjGBlDXkAI4x2H',
    },
    [Pirim.DB]: {
        id: '1227449216013946880',
        content: 'DB를 용납 못하는 피림이',
        imageId: 'EQjGjIdWoAAE5SO',
    },
    [Pirim.SegtreeLazy]: {
        id: '1227449933814534145',
        content: '세그트리 레이지 짤 줄 안다고 자랑하는 피림이',
        imageId: 'EQjHM6dWAAEyPlG',
    },
    [Pirim.G3_1Try]: {
        id: '1227450339160444929',
        content: '골3을 1트에 풀 수 있는 피림이',
        imageId: 'EQjHkdiXUAAWixI',
    },
    [Pirim.ModNeg]: {
        id: '1227450881219743747',
        content: 'mod할 때 주의점을 알려주는 피림이',
        imageId: 'EQjID95XUAMOSiO',
    },
    [Pirim.Goin]: {
        id: '1227451738963238917',
        content: '고인물 혐오증에 걸린 피림이',
        imageId: 'EQjI06-WkAA7Q2V',
    },
    [Pirim.Nande]: {
        id: '1227452097202937859',
        content: '맞았는데 왜 맞는지 모르는 피림이',
        imageId: 'EQjJKbrWkAclPk3',
    },
    [Pirim.DiaEscape]: {
        id: '1228646942692917248',
        content: '다이아 문제를 보고 도망가는 피림이',
        imageId: 'EQ0H30QU4AEjEzl',
    },
    [Pirim.NextPermuation]: {
        id: '1228647125166084096',
        content: 'next_permutation을 접한 피림이',
        imageId: 'EQ0IC3VVAAAzLp4',
    },
    [Pirim.Translate]: {
        id: '1228647393811288065',
        content: '코포 해석이 잘 안 돼서 초조한 피림이',
        imageId: 'EQ0ISgeVUAAypNt',
    },
    [Pirim.Choragi]: {
        id: '1228647599332151296',
        content: '습격자 초라기를 풀 수 있게 된 피림이',
        imageId: 'EQ0IecVUcAAyCyF',
    },
    [Pirim.Counter]: {
        id: '1228648095837118465',
        content: '반례를 못 찾아서 화가 난 피림이',
        imageId: 'EQ0I7UyVUAEUm0C',
    },
    [Pirim.CodeForcesData]: {
        id: '1228649478652973057',
        content: '코포의 빵빵한 데이터 맛을 보게 된 피림이',
        imageId: 'EQ0KLwqUEAASQcS',
    },
    [Pirim.Solved]: {
        id: '1228649748950708229',
        content: '한동안 풀지 못했던 문제를 해결한 피림이',
        imageId: 'EQ0Kbj9UYAAdv2f',
    },
    [Pirim.CodeForcesHacked]: {
        id: '1228650433251426304',
        content: '코포 종료 1분 전 핵당한 피림이',
        imageId: 'EQ0LDT0UEAEGA5L',
    },
    [Pirim.DirtyGoinmul]: {
        id: '1228667021547601921',
        content: '고인물들에게 신물이 난 피림이',
        imageId: 'EQ0aInFUwAEWs76',
    },
    [Pirim.Div2AllSolve]: {
        id: '1228667198844989441',
        content: '딥2 올솔한 친구를 보고 어이를 상실한 피림이',
        imageId: 'EQ0aTRrVUAAOWtH',
    },
    [Pirim.CodeForces1Minute]: {
        id: '1228667547819499520',
        content: '코포 시작 1분 전 신이 난 고인물들',
        imageId: 'EQ0anlEVUAIZQ61',
    },
    [Pirim.Overflow]: {
        id: '1228667858353176578',
        content: 'long long이 필요했음을 뒤늦게 깨달은 피림이',
        imageId: 'EQ0a5oBVUAEJqhr',
    },
    [Pirim.NSquare]: {
        id: '1228668149156859904',
        content: '10만 제곱의 풀이로 접근하고 있는 뉴비를 본 대머리',
        imageId: 'EQ0bKlgVAAILJ4W',
    },
    [Pirim.NLogN]: {
        id: '1228668367873007617',
        content: '뉴비가 엔록엔으로 고쳐서 접근하는 것을 본 대머리',
        imageId: 'EQ0bXQtVAAUhhnc',
    },
    [Pirim.TLE]: {
        id: '1228859422732013568',
        content: '시간초과가 해결이 안 되는 피림이',
        imageId: 'EQ3JIEbU0AELIZy',
    },
    [Pirim.Systest]: {
        id: '1228859896524754944',
        content: '시스텟 터져버린 피림이',
        imageId: 'EQ3Jj0qU4AEW9iz',
    },
    [Pirim.Parametric]: {
        id: '1228860206269943809',
        content: '파라메트릭 각을 잡은 피림이',
        imageId: 'EQ3J136VUAAKzZR',
    },
    [Pirim.Prime]: {
        id: '1228869370765438978',
        content: '소수 빌런',
        imageId: 'EQ3SLLSUYAEPEvu',
    },
    [Pirim.ProofByAC]: {
        id: '1228871684825858055',
        content: '새로운 증명법을 알게 된 피림이',
        imageId: 'EQ3UR_KUYAAbJfA',
    },
    [Pirim.Honey]: {
        id: '1228872163765055488',
        content: '꿀문제를 발견한 피림이',
        imageId: 'EQ3Ut5dUcAAsSGg',
    },
    [Pirim.HelloWorld]: {
        id: '1228872867258830849',
        content: '헬로월드를 출력하고 신난 피림이',
        imageId: 'EQ3VW29UEAswkgC',
    },
    [Pirim.FirstGrade]: {
        id: '1228897925721280515',
        content: '문제를 풀었더니 맞은 사람 탭 1등이 된 걸 확인한 피림이',
        imageId: 'EQ3sJDwVAAEPTJc',
    },
    [Pirim.SeqQuery]: {
        id: '1228949199984656384',
        content: '수열과 쿼리로 유혹해오는 피림이',
        imageId: 'EQ4axqxUcAAzv4B',
    },
    [Pirim.GoinKnowledge]: {
        id: '1229226875429343232',
        content: '고인물들의 얘기를 따라갈 수 없는 청정수들',
        imageId: 'EQ8XUkuVAAAKd3u',
    },
    [Pirim.Float128]: {
        id: '1229227418818211840',
        content: '실수 오차를 잡는 꿀팁을 알려주는 피림이',
        imageId: 'EQ8X0dAUYAEAxwG',
    },
    [Pirim.Lamen]: {
        id: '1229227993546948613',
        content: '라왈리의 추종자가 된 피림이',
        imageId: 'EQ8YV5jUwAAhTYx',
    },
    [Pirim.JustSilver]: {
        id: '1229228859179974656',
        content: '실버 문제에서 막혀 좌절 중인 피림이',
        imageId: 'EQ8ZIRdUYAEdi73',
    },
    [Pirim.SampleAC]: {
        id: '1229229605556383744',
        content: '예제만 맞아 괴로워하고 있는 피림이',
        imageId: 'EQ8ZzwLUEAARv8N',
    },
    [Pirim.CubeloverMethod]: {
        id: '1229230289492140032',
        content: '큐브러버 메소드(ctrl+a -> delete -> ctrl+s -> alt+F4)를 고민 중인 피림이',
        imageId: 'EQ8abiLVAAAthnJ',
    },
    [Pirim.AC]: {
        id: '1229231091837358085',
        content: '문제를 풀어서 세상 행복한 피림이',
        imageId: 'EQ8bKOLUUAA0XV0',
    },
    [Pirim.StdSort]: {
        id: '1229231782974738432',
        content: 'std::sort의 존재를 모르고 있었던 피림이',
        imageId: 'EQ8byfHUEAAxQx5',
    },
    [Pirim.RemoveN]: {
        id: '1229409800158531586',
        content: 'N을 떼어내는 방법을 모르는 피림이',
        imageId: 'EQ-9sOZUYAMHqEf',
    },
    [Pirim.FFTMultiplication]: {
        id: '1229416784412856321',
        content: '큰 수 곱셈을 FFT로 O(N log N)만에 구할 수 있다는 걸 알게 된 피림이',
        imageId: 'EQ_ECmjUUAAQtOu',
    },
    [Pirim.SPFASniped]: {
        id: '1229417875628183554',
        content: 'spfa로 풀었다가 저격 데이터로 뚝배기 깨진 피림이',
        imageId: 'EQ_FCXgUEAch_Fn',
    },
    [Pirim.Misread]: {
        id: '1229418911520546816',
        content: '코딩 다 하고 제출 직전에 문제를 잘못 이해한 걸 깨달은 피림이',
        imageId: 'EQ_F-x_VAAAh1U3',
    },
    [Pirim.Greedy]: {
        id: '1229578796367413248',
        content: '그리디 문제인 줄은 상상도 못한 피림이',
        imageId: 'ERBXZHsU4AA4V9M',
    },
    [Pirim.NotEasy]: {
        id: '1229579998127849472',
        content: '자신에게 어려운 문제를 고인물이 쉽다고 해서 욱한 피림이',
        imageId: 'ERBYfQ8UEAAis-7',
    },
    [Pirim.What]: {
        id: '1229604581274873856',
        content: '고인물들의 열띤 알고리즘 토론을 보게 된 피림이',
        imageId: 'ERBu2BPUcAAXJGf',
    },
    [Pirim.NPow5]: {
        id: '1229610351139803136',
        content: '자신의 O(N^5) 풀이를 지적당한 피림이',
        imageId: 'ERB0F0gVAAAiNk7',
    },
    [Pirim.ACwhyWALong]: {
        id: '1229610796130263040',
        content: '며칠째 맞왜틀을 외치고 있는 피림이',
        imageId: 'ERB0f7-UEAAuTCz',
    },
    [Pirim.Confidence]: {
        id: '1229611428107018241',
        content: '근자감이 넘쳐 흐르는 피림이',
        imageId: 'ERB1EsKUYAAR12g',
    },
    [Pirim.StopGiman]: {
        id: '1229611918567985152',
        content: '고인물의 기만에 결국 빡친 뉴비',
        imageId: 'ERB1hTuUYAAf2dE',
    },
    [Pirim.WhatDataStructure]: {
        id: '1229614073970429952',
        content: '생전 처음 들어보는 자료구조에 벙찐 피림이',
        imageId: 'ERB3ewpU4AUcqDY',
    },
    [Pirim.Evande]: {
        id: '1229725259772751878',
        content: '에바라고 생각하는 피림이',
        imageId: 'ERDcmUAVAAE4_DG',
    },
    [Pirim.IamFool]: {
        id: '1229726526339342336',
        content: '알고리즘 배우는 게 어려워서 괴로운 피림이',
        imageId: 'ERDdwPBUUAAvp4W',
    },
    [Pirim.HowSolve]: {
        id: '1229962549744959488',
        content: '남에게 받은 추천문제를 도저히 못 풀겠는 피림이',
        imageId: 'ERG0ad2UwAAIiki',
    },
    [Pirim.WhatAlgorithm]: {
        id: '1229979673884385281',
        content: '호프크로프트카프 알고리즘 이름조차 어려워하는 피림이',
        imageId: 'ERHD_P6UUAEtBDB',
    },
    [Pirim.Minus2s]: {
        id: '1229983360555999232',
        content: '17118번 문제의 말도 안 되는 구데기성에 기겁하는 피림이',
        imageId: 'ERHHV6ZUUAI9wpP',
    },
    [Pirim.GimanGiveup]: {
        id: '1230115511049936896',
        content: '고인물들의 시도 때도 없는 기만에 해탈한 피림이',
        imageId: 'ERI_hxzUwAA4Zoo',
    },
    [Pirim.BecomeGoinmul]: {
        id: '1230115993298464769',
        content: '자신도 고인물이 되고 말겠다고 다짐하는 피림이',
        imageId: 'ERI_-HIUEAEzsTC',
    },
    [Pirim.SCCTarjan]: {
        id: '1230122076347879424',
        content: 'SCC할 때 코사라주보다 타잔을 선호하는 피림이',
        imageId: 'ERJFf-RU0AEw51G',
    },
    [Pirim.NotWellKnown]: {
        id: '1230126136375431169',
        content: '웰논 소리가 지긋지긋한 피림이',
        imageId: 'ERJJMJ7VUAMnZSM',
    },
    [Pirim.EmptyPop]: {
        id: '1230421757980368896',
        content: 'pop 하기 전 empty 체크할 것을 충고하는 피림이',
        imageId: 'ERNVg3UUUAERITw',
    },
    [Pirim.BitEven]: {
        id: '1230426370628472832',
        content: '다른 사람의 코드를 보고 컬쳐쇼크를 느낀 피림이',
        imageId: 'ERNZoqDUcAAsKhT',
    },
    [Pirim.Aheui]: {
        id: '1230687215396610048',
        content: '아희를 전파하는 자와 이를 거부하는 피림이',
        imageId: 'ERRHcDAVUAEpDv0',
    },
    [Pirim.HashBreaking]: {
        id: '1231087197337440256',
        content: '해쉬를 이용해 비비는 데 성공한 피림이',
        imageId: 'ERWzCsyUEAEx5Ow',
    },
    [Pirim.Easy]: {
        id: '1231087480830484481',
        content: '요즘 문제가 잘 풀려서 기분이 좋은 피림이',
        imageId: 'ERWzZFfVAAAkKMZ',
    },
    [Pirim.Purple]: {
        id: '1231087775035748352',
        content: '퍼플각을 잡고 있는 피림이',
        imageId: 'ERWzulhU8AQekc_',
    },
    [Pirim.Cpp17]: {
        id: '1231391034006851584',
        content: 'C++17 문법을 보고 놀란 피림이',
        imageId: 'ERbHlOhVUAA4mUG',
    },
    [Pirim.ZeroPercentWA]: {
        id: '1231393229716643840',
        content: '열심히 짜고 제출했는데 바로 틀려버린 피림이',
        imageId: 'ERbJSk6U4AAPT9T',
    },
    [Pirim.AboutTLE]: {
        id: '1231394929974185985',
        content: '시간 제한 1초 문제를 턱걸이로 통과한 피림이',
        imageId: 'ERbKgATUcAAvQ-l',
    },
    [Pirim.EasyButYouHard]: {
        id: '1231402859486302208',
        content: '쉬운 문제를 괜히 어렵게 푸는 고인물을 비난하는 피림이',
        imageId: 'ERbR-rfUEAAADD6',
    },
    [Pirim.EyeGrep]: {
        id: '1231803101230723072',
        content: '열심히 코드를 노려봐도 실수를 못 찾겠는 피림이',
        imageId: 'ERg-MP3U4AEM_iq',
    },
    [Pirim.ElevenDimensionTomato]: {
        id: '1231812974408392704',
        content: '하이퍼 토마토를 건드린 피림이',
        imageId: 'ERhHQb3UcAAOc5b',
    },
    [Pirim.GimanBeSqrt]: {
        id: '1232126789914263552',
        content: '기만자를 sqrt decomposition 해버리고 싶은 피림이',
        imageId: 'ERlkhwSUcAEu-m4',
    },
    [Pirim.HintPlease]: {
        id: '1232470199250481153',
        content: '안 풀리는 문제의 힌트를 부탁하는 피림이',
        imageId: 'ERqc1IEU8AAQR_T',
    },
    [Pirim.ACwhyWA]: {
        id: '1232471282802839558',
        content: '분명 맞을 거라 확신했던 풀이가 틀린 피림이',
        imageId: 'ERqd7kJU4AEaiK8',
    },
    [Pirim.TooBad]: {
        id: '1232850174361227264',
        content: '대회가 끝나면 풀이가 생각나는 피림이',
        imageId: 'ERv2jAsUcAAEfnw',
    },
    [Pirim.NoShort]: {
        id: '1233216255626108929',
        content: '숏코딩에 손 떼는 걸 추천하는 피림이',
        imageId: 'ER1CZouU4AAHNB-',
    },
    [Pirim.Codeup]: {
        id: '1233563913876172800',
        content: '백준뿐만 아니라 코드업에서도 문제 푸는 피림이',
        imageId: 'ER5_U_0UcAACDjs',
    },
    [Pirim.AdvancedSort]: {
        id: '1233946257980178432',
        content: '조금씩 심화된 지식을 습득하는 피림이',
        imageId: 'ER_bOenUwAAwIX9',
    },
    [Pirim.CounterPlease]: {
        id: '1234302301726105601',
        content: '반례가 절실한 피림이',
        imageId: 'ESEfQkbUEAABMjl',
    },
    [Pirim.Hunsu]: {
        id: '1234689976526204929',
        content: '훈수 두고 싶어서 입이 근질근질한 피림이',
        imageId: 'ESJ_W61U0AAgjII',
    },
    [Pirim.LLVMPower]: {
        id: '1235018452252778497',
        content: 'clang의 힘을 접한 피림이',
        imageId: 'ESOqdUWUUAAZ-lr',
    },
};
const PirimValues = Object.keys(PirimMap);
exports.PirimRule = {
    name: 'pirim',
    type: 'any',
    isBlock: true,
    schema: yup.string().required().oneOf(PirimValues),
    async execute(id) {
        const tweet = PirimMap[id];
        return dedent_1.default `
    <a href="https://twitter.com/PSing_Pirim/status/${tweet.id}">
    
    > <table><tr><td><img src="https://pbs.twimg.com/profile_images/1227442623327150080/QYE5fpZ2_normal.png" alt="PSing_Pirim"></td><td><b>PS하는 피림이</b><br>@PSing_Pirim</td></tr></table>
    > 
    > ${tweet.content}
    >
    > ![Image](https://pbs.twimg.com/media/${tweet.imageId}?format=png&name=small)
    
    </a>    
    `;
    },
};
