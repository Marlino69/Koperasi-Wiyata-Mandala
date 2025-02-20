import H from "../H&F/Header"
import F from "../H&F/Footer"
import Sidebar from  "./SideBar"

export default function ConfigCMS(){
    return (
        <div>
            <H />
            <div className="flex">
                <Sidebar />
                {/* <div className="flex-1 bg-gray-100 p-4">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Test</th>
                                <th className="px-4 py-2">Aurel</th>
                                <th className="px-4 py-2">Rian</th>
                                <th className="px-4 py-2">Titit</th>
                                <th className="px-4 py-2">Memek</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2">Data 1</td>
                                <td className="px-4 py-2">Data 2</td>
                                <td className="px-4 py-2">Data 3</td>
                                <td className="px-4 py-2">Data 4</td>
                                <td className="px-4 py-2">Data 5</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
            </div>
            <F/>
        </div>
    )
}