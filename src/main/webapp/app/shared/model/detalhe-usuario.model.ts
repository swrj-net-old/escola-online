import { IUser } from 'app/core/user/user.model';
import { IHistoricoDebito } from 'app/shared/model/historico-debito.model';

export interface IDetalheUsuario {
  id?: number;
  cpf?: string;
  celular?: string;
  usuario?: IUser;
  historicoDebitos?: IHistoricoDebito[];
}

export class DetalheUsuario implements IDetalheUsuario {
  constructor(
    public id?: number,
    public cpf?: string,
    public celular?: string,
    public usuario?: IUser,
    public historicoDebitos?: IHistoricoDebito[]
  ) {}
}
