import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '@shared/infra/typeorm'

async function create() {
  const connection = await createConnection();
  const id = uuidV4();
  const password = await hash('admin123', 8);

  await connection.query(
    `INSERT INTO USERS(id, first_name,last_name, email, password, is_admin, created_at, driver_license) VALUES('${id}', 'admin', 'tester', 'admin@uptex.com.br', '${password}', true, 'now()', 'XXXXXX')`,
  );

  await connection.close();
}

create().then(() => console.log('User admin created!'));
