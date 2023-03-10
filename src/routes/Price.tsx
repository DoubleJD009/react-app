import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Overview = styled.main`
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  margin: 10px 0;
  padding: 20px;
  transform: translateY(-5px);
`;

const Tag = styled.h3`
  width: 50%;
  color: ${(props) => props.theme.textColor};
  font-size: 12pt;
`;

const Value = styled.div`
  width: 50%;
`;

const Text = styled.h3<{ isPositive?: Boolean }>`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      // refetchInterval: 5000,
    }
  );

  return (
    <Container>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <Tag>Price :</Tag>
            <Value>
              <Text isPositive={true}>
                $ {data?.quotes.USD.price.toFixed(3)}
              </Text>
            </Value>
          </Overview>
          <Overview>
            <Tag> Max Change rate in last 24h:</Tag>
            <Value>
              <Text>{data?.quotes.USD.market_cap_change_24h} %</Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Change rate (last 30 Minutes):</Tag>
            <Value>
              <Text>{data?.quotes.USD.percent_change_30m} %</Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Change rate (last 1 hours):</Tag>
            <Value>
              <Text>{data?.quotes.USD.percent_change_1h} %</Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Change rate (last 12 hours):</Tag>
            <Value>
              <Text>{data?.quotes.USD.percent_change_12h} %</Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Change rate (last 24 hours):</Tag>
            <Value>
              <Text>{data?.quotes.USD.percent_change_24h} %</Text>
            </Value>
          </Overview>
        </>
      )}
    </Container>
  );
}

export default Price;
