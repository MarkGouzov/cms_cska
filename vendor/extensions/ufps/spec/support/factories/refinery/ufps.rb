
FactoryGirl.define do
  factory :ufp, :class => Refinery::Ufps::Ufp do
    sequence(:title) { |n| "refinery#{n}" }
  end
end

