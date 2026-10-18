import { useLocalSearchParams, useRouter } from "expo-router";

import QuadroDesenho from "@/components/QuadroDesenho";
import QuizScreen from "@/components/QuizScreen";
import { useQuiz } from "@/hooks/context/QuizContext";

const QuizDesenho = () => {
  const router = useRouter();
  const { pacienteId, emoji, palavraFixa, palavraLivre } = useLocalSearchParams<{
    pacienteId: string;
    emoji: string;
    palavraFixa: string;
    palavraLivre: string;
  }>();

  const { desenho, setDesenho } = useQuiz();
  const temDesenho = !!desenho && desenho.traces.length > 0;

  const continuar = () => {
    router.push({
      pathname: "/confirmar-quiz",
      params: { pacienteId, emoji, palavraFixa, palavraLivre },
    });
  };

  return (
    <QuizScreen pronto={temDesenho} onContinuar={continuar} bloquearGestos telaCheia>
      <QuadroDesenho
        onChange={setDesenho}
        instrucao="Desenhe qualquer coisa que estiver passando pela sua cabeça"
      />
    </QuizScreen>
  );
};

export default QuizDesenho;