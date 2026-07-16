'use client';

import BadPerformanceRanking from "./bad-performance-ranking";
import PerformanceRanking from "./performance-ranking";


interface RankingProps {
    id: number;
}

export default function Ranking({ id }: RankingProps) {
    return (
        <div className="flex flex-row space-x-5">
            <PerformanceRanking id={id} />
            <BadPerformanceRanking id={id} />
        </div>
    );
}