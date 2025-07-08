"use client";

import { useState } from 'react';

const perguntas = [
  "日常の責任に圧倒され、自分の限界が近づいていると感じる。",
  "激しい一日の仕事の後に、リラックスしたり頭を切り替えたりするのが難しい。",
  "十分な休息や睡眠をとった後でも、常に疲れを感じる。",
  "些細なことでイライラしたり、頻繁に苛立ちや不機嫌になるのを感じる。",
  "日常の作業に対する生産性、集中力、意欲が低下していることに気づく。",
  "最近、強いストレスや圧力のために、突然すべてを放棄したいと思ったり感じたりすることがある。", // FLAG
  "筋肉痛、頭痛、消化器系の不調など、明らかな原因がない身体的な不快感を感じる。",
  "現在のストレスレベルが社会生活、家庭生活、恋愛関係に悪影響を及ぼしている。",
  "まだ完了していない作業や課題を考えると、緊張や不安を頻繁に感じる。",
  "単純な決断をするのが難しく、頻繁に迷ったり混乱したりすることが多い。"
];

export default function TesteEstresse() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("赤");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("緑");
      else if (soma <= 35) setResultado("黄");
      else setResultado("赤");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">ストレステスト</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">質問 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">結果: {resultado}</h2>
          {resultado === "緑" && <p>あなたはこの問題に非常によく対処できており、感情的にも安定しています。他の人を支援することも可能です。</p>}
          {resultado === "黄" && <p>取り組むべき感情的問題の兆候がありますが、決意と支援があれば克服可能です。</p>}
          {resultado === "赤" && <p>この問題に関するあなたの感情的な問題は専門家の助けが必須です。早急に医師や心理士の支援を受けてください。</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            テストをやり直す
          </button>
        </>
      )}
    </div>
  );
}
