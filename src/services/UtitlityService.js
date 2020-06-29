export default class UtitlityService {
    static cantGoBackRoute(){
        window.onbeforeunload = function () {
            return false;
        }
    }
}
