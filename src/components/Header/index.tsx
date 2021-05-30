import React from 'react';

import { Container, Content } from './styles';
import logoImg from '../../assets/logo.svg';

interface HeaderProps {
  onOpenNewTransactionModal(): void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewTransactionModal,
}: HeaderProps) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt-money" />
        <button onClick={onOpenNewTransactionModal} type="button">
          Nova transação
        </button>
      </Content>
    </Container>
  );
};
