import { Page } from "../components/Page";
import { useUsers } from "../hooks/useUsers";

export const Users = () => {
  const { isLoading, users, error } = useUsers();

  return (
      <Page title="Utilisateurs enregistrés">
        {isLoading ? (
            <p className="text-white text-center">Chargement...</p>
        ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
        ) : (
            <div className="flex justify-center mt-10 px-4">
              <div className="bg-black/80 p-6 rounded-2xl shadow-2xl w-full max-w-5xl overflow-x-auto">
                <table className="w-full table-auto border border-yellow-500 text-white font-lego text-lg">
                  <thead>
                  <tr className="bg-yellow-600 text-black">
                    <th className="py-3 px-4 border border-yellow-500">ID</th>
                    <th className="py-3 px-4 border border-yellow-500">Nom d'utilisateur</th>
                    <th className="py-3 px-4 border border-yellow-500">Rôle</th>
                  </tr>
                  </thead>
                  <tbody>
                  {users.map((user) => (
                      <tr key={user.id} className="hover:bg-yellow-100/10 transition">
                        <td className="py-2 px-4 border border-yellow-500 text-center">{user.id}</td>
                        <td className="py-2 px-4 border border-yellow-500 text-center">{user.login}</td>
                        <td className="py-2 px-4 border border-yellow-500 text-center uppercase">{user.role}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
        )}
      </Page>
  );
};
