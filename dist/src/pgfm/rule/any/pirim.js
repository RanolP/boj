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
};
const PirimValues = Object.keys(PirimMap);
exports.PirimRule = {
    name: 'pirim',
    type: 'any',
    isBlock: true,
    schema: yup.object({
        id: yup.string().required().oneOf(PirimValues),
    }),
    async execute({ id }) {
        const tweet = PirimMap[id];
        return dedent_1.default `
    <a href="https://twitter.com/PSing_Pirim/status/${tweet.id}">
    
    > <table><tr><td valign="center"><img src="https://pbs.twimg.com/profile_images/1227442623327150080/QYE5fpZ2_normal.png" alt="PSing_Pirim"></td> <td> <b>PS하는 피림이</b><br>@PSing_Pirim</td></tr></table>
    > 
    > ${tweet.content}
    >
    > ![Image](https://pbs.twimg.com/media/${tweet.imageId}?format=png&name=small)
    
    </a>    
    `;
    },
};
