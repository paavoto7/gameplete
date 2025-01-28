import { Image } from "../common/Image";
import InfoCategory from "./InfoCategory";
import CategorySection from "./CategorySection";

const GameInfo = ({ props }) => {

    return (
        <section className="flex flex-col flex-wrap m-auto mt-6 lg:mr-10 text-center lg:text-left w-11/12 md:w-10/12">
            <h1 className="my-4 lg:mt-0 text-4xl font-bold">{props.name}</h1>
            
            <div className="flex flex-col lg:flex-row sm:basis-2/3 lg:basis-[70%] ">
                <Image className="lg:self-baseline mt-4 rounded-xl self-center" cover={props.cover} name={props.name} />
                <div className="flex flex-wrap md:ml-6 justify-center lg:justify-normal">
                    <InfoCategory header="User rating" name={~~props.rating} />
                    <InfoCategory header="Critic rating" name={~~props.aggregated_rating} />
                    <InfoCategory header="Release date" name={props.release_dates?.[0].human} />
                    <div className="my-2 w-full">
                        <h2 className="font-bold text-2xl xl:text-3xl mb-2">Summary</h2>
                        <p className="xl:w-full 2xl:w-3/4 text-lg xl:text-xl leading-normal tracking-wide sm:font-medium">{props.summary}</p>
                    </div>
                </div>
            </div>

            <CategorySection id={props.id} />

        </section>
    )
}


export default GameInfo