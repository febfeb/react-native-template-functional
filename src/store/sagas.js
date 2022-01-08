import { call, all, spawn } from "redux-saga/effects";

export default function* rootSaga() {
    const sagas = [
        // Example watcher
        // getBalanceWatcher
    ]
    yield all(
        sagas.map(saga =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga)
                        break
                    } catch (e) {
                        console.log(e)
                    }
                }
            })
        )
    )
}
