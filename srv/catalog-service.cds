using {db} from '../db/schema';

@(requires : 'authenticated-user')
service CatalogService {
  entity Books          as projection on db.Books;

  @(restrict : [
    {
      grant : 'READ',
      to    : 'read:books'
    },
    {
      grant : 'WRITE',
      to    : 'write:books'
    },
  ])
  entity ProtectedBooks as projection on db.Books;
}
