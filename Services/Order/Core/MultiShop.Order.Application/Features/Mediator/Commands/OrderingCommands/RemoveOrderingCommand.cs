﻿using MediatR;

namespace MultiShop.Order.Application.Features.Mediator.Commands.OrderingCommands
{
    public class RemoveOrderingCommand(int id) : IRequest
    {
        public int Id { get; set; } = id;
    }
}
