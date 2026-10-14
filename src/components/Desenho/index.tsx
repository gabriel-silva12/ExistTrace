import Svg, { Path } from "react-native-svg"
import { DesenhoProps } from "./types"

const Desenho = ({ desenho, tamanho }: DesenhoProps) => (
    <Svg
    width={tamanho}
    height={(tamanho * desenho.altura) / desenho.largura}
    viewBox={`0 0 ${desenho.largura} ${desenho.altura}`}
    >
        {desenho.traces.map((trace, i) => (
            <Path
            key={i}
            d={trace.d}
            stroke={trace.cor}
            strokeWidth={trace.espessura}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            </Path>
        ))}
    </Svg>
)

export default Desenho