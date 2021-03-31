import { IUser } from 'app/shared/model/user.model';
import { IHistoricoDebito } from 'app/shared/model/historico-debito.model';

export interface IDetalheUsuario {
  id?: number;
  cpf?: string | null;
  celular?: string | null;
  usuario?: IUser | null;
  historicoDebitos?: IHistoricoDebito[] | null;
}

export const defaultValue: Readonly<IDetalheUsuario> = {};
