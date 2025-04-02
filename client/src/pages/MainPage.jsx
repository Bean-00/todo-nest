import GoogleMap from "../components/GoogleMap.jsx";
import useGeolocation from "../hook/useGeolocation.jsx";
import LoadPannel from "../components/LoadPannel.jsx";

const MainPage = () => {
    const location = useGeolocation();

    const markers = [
        {name: "맛집 1", lat: 37.4721842, lng: 126.9181725},
        {name: "맛집 2", lat: 37.4742767, lng: 126.91799690},
        {name: "맛집 3", lat: 37.4743000, lng: 126.91600000},
        {name: "맛집 4", lat: 37.4760000, lng: 126.91500000},
        {name: "맛집 5", lat: 37.4757987, lng: 126.91300000}
    ]

    return (
        <div className={"flex flex-col justify-center mt-7"}>
            <h1 className={"font-semibold text-3xl"}>
                웰컴 투두 리스트
            </h1>
            <div>
                {
                    location.loaded ?
                        <GoogleMap width={"100%"} height={"1000px"} lat={location.coordinates.lat}
                                   lng={location.coordinates.lng} zoom={18} markers={markers} onChange={(data)=>{console.log(data)}} /> :
                        <div className={"flex flex-col justify-center mt-7"}>
                            <div className={"flex font-semibold text-lg text-blue-600 justify-center mt-5"}>위치 정보 이용을
                                동의해주세요
                            </div>
                            <LoadPannel isActive={true} />
                        </div>
                }
            </div>
        </div>
    )
}

export default MainPage;