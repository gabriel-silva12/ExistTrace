import { useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, PanResponder,  Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg"
import type { DesenhoSalvo, Trace } from "../Desenho/types";

const CORES = [
    "#111111",
    "#407FA0",
    "#D9534F",
    "#2e9e6b",
]

const ESPESSURAS = [
    3,
    6,
    10
]

type Propiedades = {
    onChange?: (desenho: DesenhoSalvo) => void
}

const QuadroDesenho = ({onChange}: Propiedades) => {
    
    const [tamanho, setTamanho] = useState(0)
    const [traces, setTraces] = useState<Trace[]>([])
    const [atual, setAtual] = useState<string | null>(null)
    const [cor, setCor] = useState(CORES[0])
    const [espessura, setEspessura] = useState(ESPESSURAS[1])

    // valores para ser lidos pelo panresponder
    const estilo = useRef({cor, espessura})
    estilo.current = { cor, espessura }
    const tamanhoRef = useRef(0)
    const caminho = useRef("")


    //sim eu usei muita ia, não, não sei te explicar exatamente o que acontece aqui, vamos fingir que um matematico bem bondo escreveu esse a funçaõ de ponto para nos ^-^
    const ponto = (x: number, y: number) => {
        const limite = tamanhoRef.current
        const cx = Math.min(Math.max(x, 0), limite)
        const cy = Math.min(Math.max(y, 0), limite)
        return `${Math.round(cx * 10) / 10} ${Math.round(cy * 10)/10}`
    }

    const finalizar = () => {
        if (!caminho.current) return
        const novo: Trace = {
            d: caminho.current,
            cor: estilo.current.cor,
            espessura: estilo.current.espessura
        }

        caminho.current = ""
        setAtual(null)
        setTraces((anteriores: Trace[]) => [...anteriores, novo]) //spread operator... iteração de objetos ou algo
    }

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderTerminationRequest: () => false,

            onPanResponderGrant: (evento) => {
                const { locationX, locationY } = evento.nativeEvent
                caminho.current += `M${ponto(locationX, locationY)}`
                setAtual(caminho.current)
            },

            onPanResponderMove: (evento) => {
                const { locationX, locationY } = evento.nativeEvent
                caminho.current += `L ${ponto(locationX, locationY)}`
                setAtual(caminho.current)
            },
            onPanResponderRelease: finalizar,
            onPanResponderTerminate: finalizar,

        })
    ).current //de onde veio isso

    //avisa a tela que o desenho muda
    useEffect(() => {
        if (!tamanho) return
        onChange?.({
            largura: tamanho,
            altura: tamanho,
            traces
        })
    }, [traces,tamanho])

    const aoMedir = (evento : LayoutChangeEvent) => {
        const medida = Math.round(evento.nativeEvent.layout.width)
        tamanhoRef.current = medida
        setTamanho(medida)
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.quadro} onLayout={aoMedir} {...panResponder.panHandlers}>
                {/* toque é lido pelo quadro não pelo SVG */}
                <View style={StyleSheet.absoluteFill} pointerEvents="none">
                    {tamanho > 0 && (
                        <Svg width={tamanho} height={tamanho}>
                            {traces.map( ( t , i ) => (
                                <Path
                                    key={i}
                                    d={t.d}
                                    stroke={t.cor}
                                    strokeWidth={t.espessura}
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></Path>
                            ))}
                            {atual && (
                                <Path
                                    d={atual}
                                    stroke={cor}
                                    strokeWidth={espessura}
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></Path>
                            )}
                        </Svg>
                    )}
                </View>
            </View>

            <View style={styles.ferramentas}>
                <View style={styles.grupo}>
                    {CORES.map(( c ) => (
                        <Pressable
                            key={c}
                            onPress={() => setCor(c)}
                            style={[
                                styles.corBolinha,
                                { backgroundColor: c },
                                cor === c && styles.selecionado

                            ]}
                        ></Pressable>   
                    ))}
                </View>

                <View style={styles.grupo}>
                    {ESPESSURAS.map((e) => (
                        <Pressable
                            key={e}
                            onPress={() => setEspessura(e)}
                            style={[styles.espessuraArea, espessura === e && styles.selecionado]}
                        >
                            <View style={{ width: e * 2, height:e * 2, borderRadius: e, backgroundColor: "#111111"}}></View>
                        </Pressable>
                    ))}
                </View>
            </View>

            <View style={styles.acoes}>
                <Pressable
                    disabled={traces.length === 0}
                    onPress={ () => setTraces( (anteriores: Trace[]) => anteriores.slice(0, -1))}
                    style={({pressed}) => [styles.acao, traces.length === 0 && {opacity: 0.4}, pressed && {opacity: 0.6}]}
                >
                    <Text 
                    style = {styles.acaoTexto}>
                        Desfazer
                    </Text>
                </Pressable>

                <Pressable
                    disabled={traces.length === 0}
                    onPress={() => setTraces([])}
                    style={({ pressed }) => [styles.acao, traces.length === 0 && { opacity: 0.4}, pressed && { opacity: 0.6}]}
                >
                    <Text
                    style={styles.acaoTexto}>
                        Limpar
                    </Text>
                </Pressable>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
  wrapper: { width: "100%" },
  quadro: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d7e2e5",
    overflow: "hidden",
  },
  ferramentas: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  grupo: { flexDirection: "row", alignItems: "center", gap: 12 },
  corBolinha: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: "transparent" },
  espessuraArea: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  selecionado: { borderColor: "#407FA0" },
  acoes: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  acao: { paddingVertical: 8, paddingHorizontal: 4 },
  acaoTexto: { fontSize: 15, fontWeight: "600", color: "#407FA0" },
});

export default QuadroDesenho