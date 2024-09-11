class RecintosZoo {
    constructor() {
        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['Rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            CORRER: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'Rio'], carnivoro: false },
        };

        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: ['MACACO'], espacoOcupado: 3 },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [], espacoOcupado: 0 },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: ['CORRER'], espacoOcupado: 2 },
            { numero: 4, bioma: 'Rio', tamanho: 8, animais: [], espacoOcupado: 0 },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: ['LEAO'], espacoOcupado: 3 },
        ];
    }

    analisaRecintos(animal, quantidade) {
        // Verificando se o animal é válido
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        // Verificando se a quantidade é válida
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const infoAnimal = this.animais[animal];
        const tamanhoTotal = infoAnimal.tamanho * quantidade;

        // Identificando recintos viáveis
        const recintosViaveis = this.recintos.filter(recinto => {
            const biomaAdequado = infoAnimal.biomas.includes(recinto.bioma);
            const espacoDisponivel = recinto.tamanho - recinto.espacoOcupado;
            const haEspaco = espacoDisponivel >= tamanhoTotal;

            // Verificando regras específicas de carnívoros e hipopótamos
            const apenasMesmaEspecie = recinto.animais.every(a => this.animais[a].biomas[0] === infoAnimal.biomas[0] && a === animal);
            const ehHipopotamo = animal === 'HIPOPOTAMO';
            const toleraOutrasEspecies = recinto.bioma === 'savana e rio';

            if (!biomaAdequado || !haEspaco) return false;
            if (infoAnimal.carnivoro && !apenasMesmaEspecie) return false;
            if (ehHipopotamo && !toleraOutrasEspecies && recinto.animais.length > 0) return false;

            return true;
        }).map(recinto => {
            const espacoLivre = recinto.tamanho - (recinto.espacoOcupado + tamanhoTotal);
            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
        });

        if (recintosViaveis.length > 0) {
            return { recintosViaveis };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }
}

export { RecintosZoo as RecintosZoo };
