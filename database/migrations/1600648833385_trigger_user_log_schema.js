'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database');

class TriggerUserLogSchema extends Schema {
  async up() {
    this.raw(`
      SET TIMEZONE='Brazil/DeNoronha';
      CREATE OR REPLACE FUNCTION log_user() RETURNS trigger AS $log_user$
        BEGIN
            -- @author: Rennan Prysthon
            -- @description: Trigger created to store user's changes logs.
            -- @since: 20/09/2020

            IF (TG_OP = 'INSERT') THEN
              INSERT INTO user_logs
                (user_email, description, timestamp)
              VALUES
                (NEW.email, 'Created account', current_timestamp);

                RETURN NEW;
            ELSIF (TG_OP = 'UPDATE') THEN
              IF NEW.name <> OLD.name THEN
                INSERT INTO user_logs
                  (user_email, description, field_changed, field_last_value, field_new_value, timestamp)
                VALUES
                  (NEW.email, 'Changed name', 'name', OLD.name, NEW.name, current_timestamp);
              END IF;

              RETURN NEW;
            END IF;

            RETURN NULL;
          END;
      $log_user$ LANGUAGE plpgsql;
      CREATE TRIGGER log_user
        BEFORE INSERT OR UPDATE ON users
        FOR EACH ROW EXECUTE PROCEDURE log_user();
    `);
  }

  async down() {
    this.raw('DROP TRIGGER IF EXISTS log_user ON users CASCADE');
    this.raw('DROP FUNCTION log_user');
  }
}

module.exports = TriggerUserLogSchema;
