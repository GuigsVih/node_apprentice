import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt from "bcryptjs";

@Entity('users')
class User {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar')
	name: string;

	@Column('varchar')
	email: string;

	@Column('varchar')
	password: string;

	@Column({
		type: 'boolean',
		default: false
	})
	verifed: boolean;

	@Column({
		type: 'timestamp',
		default: () => "CURRENT_TIMESTAMP"
	})
	created_at: Date;

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 8);
	}
}

export default User;