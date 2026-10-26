import conexao from './banco.js'; // Importando a conexão com o banco de dados

// Função ler: vai ler os alunos do banco de dados (no momento inicial não temos nenhum)

function ler(res) {
    const sql = "SELECT * FROM alunos ORDER BY nome";

    conexao.query(sql, (erro, resultados)=> {
        // Verificando se há erro e caso positivo define o status para 400 (BAD REQUEST) e apresenta o código de erro no formato json
        if(erro){
            res.status(400).conexao.json(erro.code);
            return;
        }

        // Verifica se tem registros no banco de dados, caso não tenha, define o satatus para 204 (NO CONTENT)
        if(resultados === 0){
            res.status(204).end();
            return;
        }

        // Define o status como 200 (OK) e exibe os resultados
        res.status(200).json(resultados)
    })
}

// INSERINDO alunos no banco de dados
function inserir(aluno, res) {
    const sql = "INSERT INTO alunos SET ?" // O MySQL2 com o 'SET ?'faz com que o MySQL entenda todos os dados recebidos serão atribuidos na ordem enviada, aos campos da tabela alunos.

    conexao.query(sql, aluno, (erro) => {
        if(erro){
            res.status(400).json(erro.code);
        }else{
            res.status(201).json({ "status" : "aluno inserido"}) // alem de responder com status 201, adicionamos uma mensagem amigavel para confirmar que o usuario foi inserido no banco de dados.
        }
    })
}

// Exibindo UM aluno
function lerUm(id, res){
    const sql = "SELECT * FROM alunos WHERE id= ?"

    conexao.query(sql, id, (erro, resultados) => {
        // Checando se existe conteudo 
        if(resultados.length === 0){
            res.status(204).res.end();
            return;
        }

        if(erro){
            res.status(400).json(erro.code);
        }else{
            res.status(200).json(resultados[0]);
        }
    })
}

function atualizar(id, aluno, res) {
    const sql = "UPDATE alunos SET ? WHERE id = ?";

    // Como estamos passando dois parametros pela primeira vez precisa ser entro de um array. A ordem importa, precisamos respeitar a ordem da linha sql acima.
    conexao.query(sql, [aluno, id], (erro, resultados) => {
        if(erro){
            res.status(400).json(erro.code);
        }else{
            res.status(200).json({"status" : "aluno atualizado com sucesso"})
        }
    })
}

// deletando um aluno
function excluir(id, res){
    const sql = "DELETE FROM alunos WHERE id = ?";

    conexao.query(sql, id, (erro, resultados) => {
        if(erro){
            res.status(400).json(erro.code);
        }else{
            res.status(200).json({"status" : "aluno excluído com sucesso", id})
        }
    })
}

export { ler, inserir, lerUm, atualizar, excluir };

