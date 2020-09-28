import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem('@GithubExplore:repositories');

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplore:repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
      event.preventDefault();

      if (!newRepo) {
        setInputError('Digite o autor/nome do repositório');
        return;
      }

      try {
        const response = await api.get<Repository>(`repos/${newRepo}`);

        const repository = response.data;

        setRepositories([...repositories, repository]);
        setNewRepo('');
        setInputError('');

      } catch (err){
        setInputError('Erro na busca por esse repositório');
      }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explore" />
      <Title>Explore reposiótios no Github</Title>

    <Form hasError={ !! inputError} onSubmit={handleAddRepository}>
      <input
        value={newRepo}
        onChange={(e) => setNewRepo(e.target.value)}
        placeholder="Digite o nome do Repositório"
      />
      <button type="submit">Pesquisar</button>
    </Form>

    { inputError && <Error>{inputError}</Error> }

    <Repositories>
    {repositories.map(Repository => (
      <a key={Repository.full_name} href="teste">
        <img
          src={Repository.owner.avatar_url}
          alt={Repository.owner.login}
        />

        <div>
          <strong>{Repository.full_name}</strong>
          <p>{Repository.description}</p>
        </div>

        <FiChevronRight size={20}/>
      </a>
    ))}
    </Repositories>
    </>
  );
};

export default Dashboard;



