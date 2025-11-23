import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

// Shared modules
import { DatabaseModule } from './shared/database/database.module';

// Feature modules
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Config module (para leer .env)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database module
    DatabaseModule,

    // GraphQL module
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),

    // Feature modules
    AuthModule,
  ],
})
export class AppModule {}
