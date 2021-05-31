import React, { useState } from 'react';
import Modal from 'react-modal';

import { Container, RadioBox, TransactionTypeContainer } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { api } from '../../services/api';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose(): void;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) => {
  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  function handleCreateNewTransaction(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      title,
      value: Number(value),
      category,
      type,
    };

    api.post('/transactions', data);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        className="react-modal-close"
        onClick={onRequestClose}
        type="button"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
        />
        <TransactionTypeContainer>
          <RadioBox
            onClick={() => {
              setType('deposit');
            }}
            isActive={type === 'deposit'}
            type="button"
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            onClick={() => {
              setType('withdraw');
            }}
            isActive={type === 'withdraw'}
            type="button"
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={e => {
            setCategory(e.target.value);
          }}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};
